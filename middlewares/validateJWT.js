const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { showUser } = require('../services/users');

const errorMessage = {
    error: 'Invalid token.'
};

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('Authorization'); //Bearer token

    if(!token) {
        return res.status(401).json({
            error: 'Access denied. No token provided.'
        });
    };

    try {
        const { uid } = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

        req.authenticatedUser = await showUser({ _id: uid });

        if(!req.authenticatedUser) {
            return res.status(404).json(errorMessage);
        };

        if (!req.authenticatedUser.status) {
            return res.status(401).json(errorMessage);
        };

        next();

    } catch (error) {
        console.log('ERROR', error);
        res.status(401).json(errorMessage);
    }
};

module.exports = validateJWT;