const { allowedCollections, searchInUsers, searchInCategories, searchInProducts } = require('../lib/searchHelpers');

const searchByCollection = async (req) => {
    const { collection, q } = req.params;

    if(!allowedCollections.includes(collection)) {
        const error = new Error('The collection is not allowed');

        error.status = 400;

        throw error;
    }

    switch (collection) {
        case 'users':
            return await searchInUsers(q);
        case 'categories': 
            return await searchInCategories(q);
        case 'products':
            return await searchInProducts(q);    
        default:
            throw new Error('Internal server error.');
    }
};

module.exports = {
    searchByCollection
};