const { response } = require('express');
const { getUsers, storeUser, updateUser, getUsersPaginated, deleteUser } = require('../services/users');

const index = async (req, res = response) => {
    const users = await getUsers(req);

    res.json({
        data: users
    });
};

const paginated = async (req, res = response) => {
    const { users, total, limit, from } = await getUsersPaginated(req);

    res.json({
        data: users,
        limit,
        from,
        total
    });
};

const store = async (req, res = response) => {
    const user = await storeUser(req);

    res.status(201).json({
        user
    });
};

const update = async (req, res = response) => {
    const user = await updateUser(req);

    res.json({
        user
    });
};

const destroy = async (req, res = response) => {
    const user = await deleteUser(req);

    res.json({
        user
    });
};

module.exports = {
    index,
    store,
    update,
    destroy,
    paginated
}