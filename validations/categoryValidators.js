const Category = require('../models/Category')

const categoryExistsByName = async (name = '') => {
    const exists = await Category.findOne({ name })

    return exists
}

const categoryExistsById = async (id = '') => {
    const exists = await Category.findById(id)

    if (!exists) {
        const error = new Error('The category does not exist.')

        throw error
    }
}

module.exports = {
    categoryExistsByName,
    categoryExistsById,
}
