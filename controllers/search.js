const { response } = require('express');
const { searchByCollection } = require('../services/search');

const search = (req, res = response) => {

    const result = searchByCollection(req);

    res.json({
        msg: 'Search works'
    })
};

module.exports = {
    search
};