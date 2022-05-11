const { response } = require('express')
const {
    getUsers,
    storeUser,
    updateUser,
    getUsersPaginated,
    deleteUser,
} = require('../services/users')

const index = async (req, res = response) => {
    const users = await getUsers()

    res.json({
        data: users,
    })
}

const paginated = async (req, res = response) => {
    const { query } = req
    const { users, total, limit, from } = await getUsersPaginated(query)

    res.json({
        data: users,
        limit,
        from,
        total,
    })
}

const store = async (req, res = response) => {
    const { body } = req
    const user = await storeUser(body)

    res.status(201).json({
        user,
    })
}

const update = async (req, res = response) => {
    const { params, body } = req
    const user = await updateUser(params, body)

    res.json({
        data: user,
    })
}

const destroy = async (req, res = response) => {
    const { params } = req
    const user = await deleteUser(params)

    res.json({
        data: user,
    })
}

module.exports = {
    index,
    store,
    update,
    destroy,
    paginated,
}
