const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { showUser } = require('../services/users');

const validateJWT = async (req = request, res = response, next) => {
    try {
        const token = req.header('Authorization'); //Bearer token
        const error = new Error('Invalid token.');

        if(!token) {
            error.message = 'Access denied. No token provided.'
            error.status = 401;

            throw error;
        };

        const { uid } = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

        req.authenticatedUser = await showUser({ _id: uid });

        if(!req.authenticatedUser) {
            error.status = 404;
            throw error;
        };

        if (!req.authenticatedUser.status) {
            error.status = 401;
            throw error;
        };

        next();

    } catch (error) {
        next(error)
    }
};

module.exports = validateJWT;