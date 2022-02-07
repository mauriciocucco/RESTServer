const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'The status is required']
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The creator is required']
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'The category is required']
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    // image: {
    //     type: String
    // },
    image: {
        type: Object
    },
});

ProductSchema.methods.toJSON = function() {
    const { __v, status, ...product } = this.toObject(); //Saco __v y status del objeto que retorno

    return product;
};

module.exports = model('Product', ProductSchema);