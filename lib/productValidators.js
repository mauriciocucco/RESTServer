const Product = require("../models/Product");

const productExistsByName = async (name = '') => {
    const exists = await Product.findOne({ name });

    return exists;
};

const productExistsById = async (id = '') => {
    const product = await Product.findById(id);

    if(!product) {
        throw new Error('The product does not exists.');
    };

    return product;
};

module.exports = {
    productExistsByName,
    productExistsById
};