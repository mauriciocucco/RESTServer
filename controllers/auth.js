const { response } = require("express");
const { loginUser } = require("../services/auth");

const login = async (req, res =  response) => {
    try {
        await loginUser(req);
        
        res.json({
            message: "Welcome"
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