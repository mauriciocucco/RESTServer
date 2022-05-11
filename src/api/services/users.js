const { encryptPassword } = require('../helpers')
const User = require('../models/User')

const getUsers = async () => {
    const users = await User.find({ status: true })

    return users
}

const getUsersPaginated = async (queryParams) => {
    const { limit = 10, from = 0 } = queryParams
    const query = { status: true }

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).limit(Number(limit)).skip(Number(from)),
    ])

    return { users, total, limit, from }
}

const showUser = async (filter) => {
    const user = await User.findOne(filter)

    return user
}

const storeUser = async (reqBody) => {
    const { name, email, password, role } = reqBody
    const user = new User({
        name,
        email,
        password,
        role,
    })

    user.password = encryptPassword(password)

    await user.save()

    return user
}

const updateUser = async (reqParams, reqBody) => {
    const { id } = reqParams
    const { _id, password, google, email, ...updateFields } = reqBody

    if (password) {
        updateFields.password = encryptPassword(password)
    }

    const user = await User.findByIdAndUpdate(id, updateFields, { new: true }) // el new: true es para que retorne el objeto actualizado

    return user
}

const deleteUser = async (reqParams) => {
    const { id } = reqParams
    const user = await User.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
    ) // el new: true es para que retorne el objeto actualizado

    return user
}

module.exports = {
    getUsers,
    getUsersPaginated,
    showUser,
    storeUser,
    updateUser,
    deleteUser,
}
