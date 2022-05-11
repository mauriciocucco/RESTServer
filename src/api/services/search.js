const {
    allowedCollections,
    searchInUsers,
    searchInCategories,
    searchInProducts,
} = require('../helpers/searchHelpers')

const searchByCollection = async (reqParams) => {
    const { collection, q } = reqParams

    if (!allowedCollections.includes(collection)) {
        const error = new Error('The collection is not allowed')

        error.status = 400

        throw error
    }

    switch (collection) {
        case 'users':
            await searchInUsers(q)
            return
        case 'categories':
            await searchInCategories(q)
            return
        case 'products':
            await searchInProducts(q)
            return
        default:
            throw new Error('Internal server error.')
    }
}

module.exports = {
    searchByCollection,
}
