const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The mail is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'The role is required'],
        enum: ['USER', 'ADMIN']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('User', UserSchema);