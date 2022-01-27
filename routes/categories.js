const { Router } = require('express');
const { check } = require('express-validator');
const { validateBody, validateJWT, isAdmin } = require('../middlewares');
const { roleValidator } = require('../lib/roleValidators');
const { categoryExistsById } = require('../lib/categoryValidators');
const { index, paginated, show, store, update, destroy } = require('../controllers/categories');
const router = Router();

router.get('/', index);

router.get('/paginated', paginated);

router.get('/:id', [
    check('id', 'The id is not valid.').isMongoId(),
    validateBody
], show);

router.post('/', [
    validateJWT,
    check('name', 'The name is mandatory.').not().isEmpty(),
    validateBody
], store);

router.put('/:id', [
    validateJWT,
    check('name', 'The name is mandatory.').not().isEmpty(),
    check('id', 'The id is not valid.').isMongoId(),
    check('id').custom(categoryExistsById),
    validateBody
], update);

router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'The id is not valid.').isMongoId(),
    check('id').custom(categoryExistsById),
    validateBody
], destroy);

module.exports = router;