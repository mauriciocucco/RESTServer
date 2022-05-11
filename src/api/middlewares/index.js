const validateBody = require('./validateBody')
const validateJWT = require('./validateJWT')
const validateRoles = require('./validateRoles')
const validateFile = require('./validateFile')
const errorsMiddlewares = require('./errorsMiddlewares')

module.exports = {
    validateBody,
    validateJWT,
    validateFile,
    ...errorsMiddlewares,
    ...validateRoles,
}
