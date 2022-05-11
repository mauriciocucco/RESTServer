const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
    },
    email: {
        type: String,
        required: [true, 'The mail is required'],
        unique: true, // no es una validación de Mongoose, sino de MongoDB
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    // image: {
    //     type: String
    // },
    image: {
        type: Object,
    },
    role: {
        type: String,
        required: [true, 'The role is required'],
        // enum: ['USER', 'ADMIN']
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
})

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject() // Saco __v y password del objeto que retorno

    user.uid = _id

    return user
}

module.exports = model('User', UserSchema)
