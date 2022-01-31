const Product = require("../models/Product");
const { productExistsByName } = require("../lib/productValidators");

const getProducts = async () => {
    const product = await Product.find({ status: true})
                    .populate('creator', 'name')
                    .populate('category', 'name');

    return product;
};

const getProductsPaginated = async (req) => {
    const { limit = 10, from = 0 } = req.query;
    const query = { status: true };

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('creator', 'name')
        .populate('category', 'name')
        .limit(Number(limit))
        .skip(Number(from))
    ]);

    return ({ products, total, limit, from });
};

const getProduct = async (req) => {
    const product = await Product.findById(req.params.id)
                    .populate('creator', 'name')
                    .populate('category', 'name');

    if(!product) {
        throw ({
            code: 400,
            error: 'The product does not exist.'
        });
    };

    return product;
};

const storeProduct = async (req) => {
    try {
        const { status, name, ...otherFields } = req.body;

        const productExists = await productExistsByName(name);

        if(productExists) {
            throw {
                code: 400,
                error: 'The product already exists.'
            };
        }

        const data = {
            name: name.toUpperCase(),
            creator: req.authenticatedUser._id,
            ...otherFields
        };
        
        const product = new Product(data);

        await product.save();

        return product;

    } catch (error) {
        throw error;
    }
};

const updateProduct = async (req) => {
    const { id } = req.params;
    const { status, creator, ...data } = req.body;

    if(data.name) data.name = data.name.toUpperCase();
    data.creator = req.authenticatedUser._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true }); //el new: true es para que retorne el objeto actualizado

    return product;
};

const deleteProduct = async (req) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true }); //el new: true es para que retorne el objeto actualizado

    return product;
};

module.exports = {
    getProducts,
    getProductsPaginated,
    getProduct,
    storeProduct,
    updateProduct,
    deleteProduct
};