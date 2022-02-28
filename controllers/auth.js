const { response } = require("express");
const verifyGoogleToken = require("../lib/verifyGoogleToken");
const { loginUser } = require("../services/auth");
const verifyGoogleUser = require("../lib/verifyGoogleUser");
const createJWT = require("../lib/createJWT");

const validateToken = async (req, res = response, next) => {
    try {
        const token = await createJWT({ uid: req.authenticatedUser.id });
    
        res.json({ user: req.authenticatedUser, refreshToken: token });
       
    } catch (error) {
        next(error);
    }
};

const login = async (req, res = response, next) => {
    try {
        const { token, user } = await loginUser(req);
        
        res.json({
            user,
            token
        })

    } catch (error) {
        next(error)
    }
};

const googleSignIn = async (req, res = response, next) => {
    try {
        const { id_token } = req.body;

        const googleUser = await verifyGoogleToken(id_token);

        const response = await verifyGoogleUser(googleUser);

        res.json(response);

    } catch (error) {
        console.log('ERROR', error);

        next(error)
    } 
};

module.exports = {
    login,
    googleSignIn,
    validateToken
};