const validateBody = require('./validateBody');
const validateJWT = require('./validateJWT');
const validateRoles = require('./validateRoles');
const validateFile = require('./validateFile');

module.exports = {
    validateBody,
    validateJWT,
    validateFile,
    ...validateRoles
}