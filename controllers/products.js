const { response } = require('express')
const {
    getProducts,
    getProductsPaginated,
    getProduct,
    storeProduct,
    updateProduct,
    deleteProduct,
} = require('../services/products')

const index = async (req, res = response) => {
    const products = await getProducts()

    res.json({
        data: products,
    })
}

const paginated = async (req, res = response) => {
    const { query } = req
    const { products, total, limit, from } = await getProductsPaginated(query)

    res.json({
        data: products,
        limit,
        from,
        total,
    })
}

const show = async (req, res, next) => {
    try {
        const { params } = req
        const product = await getProduct(params)

        res.json({
            data: product,
        })
    } catch (error) {
        console.log('ERROR: ', error)

        next(error)
    }
}

const store = async (req, res, next) => {
    try {
        const { body, authenticatedUser } = req
        const product = await storeProduct(body, authenticatedUser)

        res.status(201).json({
            product,
        })
    } catch (error) {
        console.log('ERROR: ', error)

        next(error)
    }
}

const update = async (req, res = response) => {
    const { body, params, authenticatedUser } = req
    const product = await updateProduct(body, params, authenticatedUser)

    res.json({
        data: product,
    })
}

const destroy = async (req, res = response) => {
    const { params } = req
    const product = await deleteProduct(params)

    res.json({
        data: product,
    })
}

module.exports = {
    index,
    paginated,
    show,
    store,
    update,
    destroy,
}
