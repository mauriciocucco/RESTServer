const { ObjectId } = require('mongoose').Types;
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

const allowedCollections = ['users', 'products', 'categories'];

const searchInUsers = async (q = '') => {
    const isMongoId = ObjectId.isValid(q);

    if (isMongoId) {
        return await User.findById(q);
    }

    const regex = new RegExp(q, 'i');

    return await User.find({ 
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    });
};

const searchInCategories = async (q = '') => {
    const isMongoId = ObjectId.isValid(q);

    if (isMongoId) {
        return await Category.findById(q);
    }

    const regex = new RegExp(q, 'i');

    return await Category.find({ name: regex, status: true });
};

const searchInProducts = async (q = '') => {
    const isMongoId = ObjectId.isValid(q);

    if (isMongoId) {
        return await Product.findById(q).populate('category', 'name');
    }

    const regex = new RegExp(q, 'i');

    return await Product.find({ 
        $or: [{ name: regex} , { description: regex }],
        $and: [{ available: true }]
    })
    .populate('category', 'name');
};

module.exports = {
    allowedCollections,
    searchInUsers,
    searchInCategories,
    searchInProducts
}