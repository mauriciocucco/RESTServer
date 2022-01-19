const { response } = require("express");
const { loginUser } = require("../services/auth");

const login = async (req, res =  response) => {
    try {
        const { token, user } = await loginUser(req);
        
        res.json({
            user,
            token
        })

    } catch (error) {
        console.log('ERROR', error);

        res.status(error.code).json({
            error: error.error
        });
    }
};

module.exports = {
    login
};