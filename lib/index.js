const categoryValidators = require('./categoryValidators');
const createJWT = require('./createJWT');
const encryptPassword = require('./encryptPassword');
const productValidators = require('./productValidators');
const roleValidators = require('./roleValidators');
const searchHelpers = require('./searchHelpers');
const userValidators = require('./userValidators');
const validateFile = require('./validateFile');
const validatePassword = require('./validatePassword');
const verifyGoogleToken = require('./verifyGoogleToken');
const verifyGoogleUser = require('./verifyGoogleUser');
const verifyModel = require('./verifyModel');
const verifyToken = require('./verifyToken');

module.exports = {
    ...categoryValidators,
    ...productValidators,
    ...roleValidators,
    ...searchHelpers,
    ...userValidators,
    ...validateFile,
    createJWT,
    encryptPassword,
    validatePassword,
    verifyGoogleToken,
    verifyGoogleUser,
    verifyModel,
    verifyToken
};