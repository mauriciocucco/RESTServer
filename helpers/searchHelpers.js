const { ObjectId } = require('mongoose').Types
const User = require('../models/User')
const Category = require('../models/Category')
const Product = require('../models/Product')

const allowedCollections = ['users', 'products', 'categories']

const searchInUsers = async (q = '') => {
    const isMongoId = ObjectId.isValid(q)

    if (isMongoId) {
        await User.findById(q)
        return
    }

    const regex = new RegExp(q, 'i')

    await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }],
    })
}

const searchInCategories = async (q = '') => {
    const isMongoId = ObjectId.isValid(q)

    if (isMongoId) {
        await Category.findById(q)
        return
    }

    const regex = new RegExp(q, 'i')

    await Category.find({ name: regex, status: true })
}

const searchInProducts = async (q = '') => {
    const isMongoId = ObjectId.isValid(q)

    if (isMongoId) {
        await Product.findById(q).populate('category', 'name')
        return
    }

    const regex = new RegExp(q, 'i')

    await Product.find({
        $or: [{ name: regex }, { description: regex }],
        $and: [{ available: true }],
    }).populate('category', 'name')
}

module.exports = {
    allowedCollections,
    searchInUsers,
    searchInCategories,
    searchInProducts,
}
