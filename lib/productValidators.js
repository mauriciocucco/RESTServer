const Product = require("../models/Product");

const productExistsByName = async (name = '') => {
    const exists = await Product.findOne({ name });

    return exists;
};

const productExistsById = async (id = '') => {
    const exists = await Product.findById(id);

    if(!exists) {
        throw new Error('The product does not exists.');
    };
};

module.exports = {
    productExistsByName,
    productExistsById
};