const categoryValidators = require('./categoryValidators')
const productValidators = require('./productValidators')
const roleValidators = require('./roleValidators')
const userValidators = require('./userValidators')
const validateFile = require('./validateFile')
const validatePassword = require('./validatePassword')

module.exports = {
    ...categoryValidators,
    ...productValidators,
    ...roleValidators,
    ...userValidators,
    ...validateFile,
    validatePassword,
}
