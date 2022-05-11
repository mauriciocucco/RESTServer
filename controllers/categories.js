const { response } = require('express')
const {
    getCategories,
    getCategoriesPaginated,
    getCategory,
    storeCategory,
    updateCategory,
    deleteCategory,
} = require('../services/categories')

const index = async (req, res = response) => {
    const categories = await getCategories()

    res.json({
        data: categories,
    })
}

const paginated = async (req, res = response) => {
    const { query } = req
    const { categories, total, limit, from } = await getCategoriesPaginated(
        query
    )

    res.json({
        data: categories,
        limit,
        from,
        total,
    })
}

const show = async (req, res, next) => {
    try {
        const { params } = req
        const category = await getCategory(params)

        res.json({
            data: category,
        })
    } catch (error) {
        console.log('ERROR: ', error)

        next(error)
    }
}

const store = async (req, res, next) => {
    try {
        const { body, authenticatedUser } = req
        const category = await storeCategory(body, authenticatedUser)

        res.status(201).json({
            category,
        })
    } catch (error) {
        console.log('ERROR: ', error)

        next(error)
    }
}

const update = async (req, res = response) => {
    const { body, params, authenticatedUser } = req
    const category = await updateCategory(body, params, authenticatedUser)

    res.json({
        data: category,
    })
}

const destroy = async (req, res = response) => {
    const { params } = req
    const category = await deleteCategory(params)

    res.json({
        data: category,
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
