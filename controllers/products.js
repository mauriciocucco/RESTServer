const { response } = require('express');
const { getProducts, getProductsPaginated, getProduct, storeProduct, updateProduct, deleteProduct } = require('../services/products');

const index = async (req, res = response) => {
    const products = await getProducts();

    res.json({
        data: products
    });
};

const paginated = async (req, res = response) => {
    const { products, total, limit, from } = await getProductsPaginated(req);

    res.json({
        data: products,
        limit,
        from,
        total
    });
};

const show = async (req, res = response) => {
    try {
        const product = await getProduct(req);
    
        res.json({
            data: product
        });

    } catch (error) {
        console.log('ERROR: ', error);
        res.status(error.code || 500).json({
            error: error.error || 'Internal Server Error'
        });
    }
};

const store = async (req, res = response) => {
    try {
        const product = await storeProduct(req);

        res.status(201).json({
            product
        });
        
    } catch (error) {
        console.log('ERROR: ', error);
        res.status(error.code || 500).json({
            error: error.error || 'Internal Server Error'
        });
    }
};

const update = async (req, res = response) => {
    const product = await updateProduct(req);

    res.json({
        data: product
    });
};

const destroy = async (req, res = response) => {
    const product = await deleteProduct(req);

    res.json({
        data: product
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