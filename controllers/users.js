const { response } = require('express');
const User = require('../models/User');

const index = (req, res = response) => {
    const {q , limit = 10, page = 1} = req.query;

    res.json({
        message: 'GET API',
        q,
        limit,
        page
    });
};

const store = async (req, res = response) => {
    const body = req.body;
    const user = new User( body );

    await user.save();

    res.status(201).json({
        user
    });
};

const update = (req, res = response) => {

    const id = req.params.id;

    res.json({
        message: 'PUT API',
        id
    });
};

const destroy = (req, res = response) => {
    const id = req.params.id;

    res.json({
        message: 'DELETE API',
        id
    });
};

module.exports = {
    index,
    store,
    update,
    destroy
}