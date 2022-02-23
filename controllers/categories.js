const { response } = require('express');
const { getCategories, getCategoriesPaginated, getCategory, storeCategory, updateCategory, deleteCategory } = require('../services/categories');

const index = async (req, res = response) => {
    const categories = await getCategories();

    res.json({
        data: categories
    });
};

const paginated = async (req, res = response) => {
    const { categories, total, limit, from } = await getCategoriesPaginated(req);

    res.json({
        data: categories,
        limit,
        from,
        total
    });
};

const show = async (req, res = response) => {
    try {
        const category = await getCategory(req);
    
        res.json({
            data: category
        });

    } catch (error) {
        console.log('ERROR: ', error);

        next(error);
    }
};

const store = async (req, res = response) => {
    try {
        const category = await storeCategory(req);

        res.status(201).json({
            category
        });
        
    } catch (error) {
        console.log('ERROR: ', error);

        next(error);
    }
};

const update = async (req, res = response) => {
    const category = await updateCategory(req);

    res.json({
        data: category
    });
};

const destroy = async (req, res = response) => {
    const category = await deleteCategory(req);

    res.json({
        data: category
    });
};

module.exports = {
    index,
    paginated,
    show,
    store,
    update,
    destroy
}