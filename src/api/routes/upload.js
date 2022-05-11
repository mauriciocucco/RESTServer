const { Router } = require('express')
const { check } = require('express-validator')
const { upload, update, show } = require('../controllers/upload')
const { validateBody, validateFile } = require('../middlewares')

const router = Router()

router.get(
    '/:collection/:id',
    [
        // validateJWT,
        check('id', 'The id is not valid.').isMongoId(),
        check('collection', 'The collection is not allowed.').isIn([
            'users',
            'products',
        ]),
        validateBody,
    ],
    show
)

router.post(
    '/',
    [
        // validateJWT
        validateFile,
    ],
    upload
)

router.put(
    '/:collection/:id',
    [
        // validateJWT,
        validateFile,
        check('id', 'The id is not valid.').isMongoId(),
        check('collection', 'The collection is not allowed.').isIn([
            'users',
            'products',
        ]),
        validateBody,
    ],
    update
)

module.exports = router
