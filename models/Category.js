const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true
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
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, status, ...category } = this.toObject(); //Saco __v y status del objeto que retorno

    return category;
};

module.exports = model('Category', CategorySchema);