const { response } = require("express");
const verifyGoogleToken = require("../lib/verifyGoogleToken");
const { loginUser } = require("../services/auth");
const verifyGoogleUser = require("../lib/verifyGoogleUser");

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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const googleUser = await verifyGoogleToken(id_token);

        const response = await verifyGoogleUser(googleUser);

        res.json(response);

    } catch (error) {
        console.log('ERROR', error);

        res.status(error.code).json({
            error: error.error
        });
    } 
};

module.exports = {
    login,
    googleSignIn
};