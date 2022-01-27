const encryptPassword = require('../lib/encryptPassword');
const User = require('../models/User');

const getUsers = async () => {
    const users = await User.find({ status: true });

    return users;
};

const getUsersPaginated = async (req) => {
    const { limit = 10, from = 0 } = req.query;
    const query = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .limit(Number(limit))
        .skip(Number(from))
    ]);

    return ({ users, total, limit, from });
};

const showUser = async (filter) => {
    const user = await User.findOne(filter);

    return user;
};

const storeUser = async (req) => {
    const { name, email, password, role } = req.body;
    const user = new User({
        name,
        email,
        password,
        role
    });

    user.password = encryptPassword(password);

    await user.save();

    return user;
};

const updateUser = async (req) => {
    const { id } = req.params;
    const { _id, password, google, email, ...updateFields } = req.body;

    if(password) {
        updateFields.password = encryptPassword(password);
    };

    const user = await User.findByIdAndUpdate(id, updateFields, { new: true }); //el new: true es para que retorne el objeto actualizado

    return user;
};

const deleteUser = async (req) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true }); //el new: true es para que retorne el objeto actualizado

    return user;
};

module.exports = {
    getUsers,
    getUsersPaginated,
    showUser,
    storeUser,
    updateUser,
    deleteUser
};