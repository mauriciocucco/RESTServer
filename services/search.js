const { allowedCollections, searchInUsers, searchInCategories, searchInProducts } = require('../lib/searchHelpers');

const searchByCollection = async (req) => {
    const { collection, q } = req.params;

    if(!allowedCollections.includes(collection)) {
        throw {
            code: 400,
            error: 'The collection is not allowed'
        }
    }

    switch (collection) {
        case 'users':
            return await searchInUsers(q);
        case 'categories': 
            return await searchInCategories(q);
        case 'products':
            return await searchInProducts(q);    
        default:
            throw {
                code: 500,
                error: 'Internal server error'
            }
    }
};

module.exports = {
    searchByCollection
};