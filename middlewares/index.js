const validateBody = require('./validateBody');
const validateJWT = require('./validateJWT');
const validateRoles = require('./validateRoles');

module.exports = {
    validateBody,
    validateJWT,
    ...validateRoles
}