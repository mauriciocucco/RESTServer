/* eslint-disable no-underscore-dangle */
const Category = require('../models/Category')
const { categoryExistsByName } = require('../validations/categoryValidators')

const getCategories = async () => {
    const categories = await Category.find({ status: true }).populate(
        'creator',
        'name'
    )

    return categories
}

const getCategoriesPaginated = async (queryParams) => {
    const { limit = 10, from = 0 } = queryParams
    const query = { status: true }

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('creator', 'name')
            .limit(Number(limit))
            .skip(Number(from)),
    ])

    return { categories, total, limit, from }
}

const getCategory = async (reqParams) => {
    const category = await Category.findById(reqParams.id).populate(
        'creator',
        'name'
    )

    if (!category) {
        const error = new Error('The category does not exist.')

        error.status = 400

        throw error
    }

    return category
}

const storeCategory = async (reqBody, reqAuthenticatedUser) => {
    try {
        const name = reqBody.name.toUpperCase()

        const categoryExists = await categoryExistsByName(name)

        if (categoryExists) {
            const error = new Error('The category already exists.')

            error.status = 400

            throw error
        }

        const data = {
            name,
            creator: reqAuthenticatedUser._id,
        }

        const category = new Category(data)

        await category.save()

        return category
    } catch (error) {
        console.log('STORE CATEGORY ERROR: ', error)
        throw error
    }
}

const updateCategory = async (reqBody, reqParams, reqAuthenticatedUser) => {
    const { status, creator, ...data } = reqBody
    const { id } = reqParams

    if (data.name) data.name = data.name.toUpperCase()
    data.creator = reqAuthenticatedUser._id

    const category = await Category.findByIdAndUpdate(id, data, { new: true }) // el new: true es para que retorne el objeto actualizado

    return category
}

const deleteCategory = async (reqParams) => {
    const { id } = reqParams
    const category = await Category.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
    ) // el new: true es para que retorne el objeto actualizado

    return category
}

module.exports = {
    getCategories,
    getCategoriesPaginated,
    getCategory,
    storeCategory,
    updateCategory,
    deleteCategory,
}
