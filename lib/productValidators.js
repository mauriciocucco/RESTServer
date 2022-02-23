const Product = require("../models/Product");

const productExistsByName = async (name = '') => {
    const exists = await Product.findOne({ name });

    return exists;
};

const productExistsById = async (id = '') => {
    const product = await Product.findById(id);

    if(!product) {
        const error = new Error('The product does not exist.');

        throw error;
    };

    return product;
};

module.exports = {
    productExistsByName,
    productExistsById
};