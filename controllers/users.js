const { response } = require('express');

const index = (req, res = response) => {
    const {q , limit = 10, page = 1} = req.query;

    res.json({
        message: 'GET API',
        q,
        limit,
        page
    });
};

const store = (req, res = response) => {
    const body = req.body;

    res.status(201).json({
        message: 'POST API',
        body
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