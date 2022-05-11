/* eslint-disable no-underscore-dangle */
const Product = require('../models/Product')
const { productExistsByName } = require('../validations/productValidators')

const getProducts = async () => {
    const product = await Product.find({ status: true })
        .populate('creator', 'name')
        .populate('category', 'name')

    return product
}

const getProductsPaginated = async (queryParams) => {
    const { limit = 10, from = 0 } = queryParams
    const query = { status: true }

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('creator', 'name')
            .populate('category', 'name')
            .limit(Number(limit))
            .skip(Number(from)),
    ])

    return { products, total, limit, from }
}

const getProduct = async (reqParams) => {
    const product = await Product.findById(reqParams.id)
        .populate('creator', 'name')
        .populate('category', 'name')

    if (!product) {
        const error = new Error('The product does not exist.')

        error.status = 400

        throw error
    }

    return product
}

const storeProduct = async (reqBody, reqAuthenticatedUser) => {
    try {
        const { status, name, ...otherFields } = reqBody

        const productExists = await productExistsByName(name)

        if (productExists) {
            const error = new Error('The product already exists.')

            error.status = 400

            throw error
        }

        const data = {
            name: name.toUpperCase(),
            creator: reqAuthenticatedUser._id,
            ...otherFields,
        }

        const product = new Product(data)

        await product.save()

        return product
    } catch (error) {
        console.log(' STORE PRODUCT ERROR: ', error)
        throw error
    }
}

const updateProduct = async (reqBody, reqParams, reqAuthenticatedUser) => {
    const { status, creator, ...data } = reqBody
    const { id } = reqParams

    if (data.name) data.name = data.name.toUpperCase()
    data.creator = reqAuthenticatedUser._id

    const product = await Product.findByIdAndUpdate(id, data, { new: true }) // el new: true es para que retorne el objeto actualizado

    return product
}

const deleteProduct = async (reqParams) => {
    const { id } = reqParams
    const product = await Product.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
    ) // el new: true es para que retorne el objeto actualizado

    return product
}

module.exports = {
    getProducts,
    getProductsPaginated,
    getProduct,
    storeProduct,
    updateProduct,
    deleteProduct,
}
