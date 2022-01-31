const Category = require("../models/Category");
const { categoryExistsByName } = require("../lib/categoryValidators");

const getCategories = async () => {
    const categories = await Category.find({ status: true}).populate('creator', 'name');

    return categories;
};

const getCategoriesPaginated = async (req) => {
    const { limit = 10, from = 0 } = req.query;
    const query = { status: true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .populate('creator', 'name')
        .limit(Number(limit))
        .skip(Number(from))
    ]);

    return ({ categories, total, limit, from });
};

const getCategory = async (req) => {
    const category = await Category.findById(req.params.id).populate('creator', 'name');

    if(!category) {
        throw ({
            code: 400,
            error: 'The category does not exist.'
        });
    };

    return category;
};

const storeCategory = async (req) => {
    try {
        const name = req.body.name.toUpperCase();

        const categoryExists = await categoryExistsByName(name);

        if(categoryExists) {
            throw {
                code: 400,
                error: 'The category already exists.'
            };
        }

        const data = {
            name,
            creator: req.authenticatedUser._id
        };
        
        const category = new Category(data);

        await category.save();

        return category;

    } catch (error) {
        throw error;
    }
};

const updateCategory = async (req) => {
    const { id } = req.params;
    const { status, creator, ...data } = req.body;

    if(data.name) data.name = data.name.toUpperCase();
    data.creator = req.authenticatedUser._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true }); //el new: true es para que retorne el objeto actualizado

    return category;
};

const deleteCategory = async (req) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { status: false }, { new: true }); //el new: true es para que retorne el objeto actualizado

    return category;
};

module.exports = {
    getCategories,
    getCategoriesPaginated,
    getCategory,
    storeCategory,
    updateCategory,
    deleteCategory
};