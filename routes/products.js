const { Router } = require('express');
const { check } = require('express-validator');
const { validateBody, validateJWT, isAdmin } = require('../middlewares');
const { productExistsById } = require('../lib/productValidators');
const { index, paginated, show, store, update, destroy } = require('../controllers/products');
const { categoryExistsById } = require('../lib/categoryValidators');
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
    check('category', 'The category is mandatory.').not().isEmpty(),
    check('category', 'The category is not valid.').isMongoId(),
    check('category').custom(categoryExistsById),
    validateBody
], store);

router.put('/:id', [
    validateJWT,
    check('id', 'The id is not valid.').isMongoId(),
    check('id').custom(productExistsById),
    check('category', 'The category is not valid.').optional().isMongoId(),
    check('category').optional().custom(categoryExistsById),
    validateBody
], update);

router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'The id is not valid.').isMongoId(),
    check('id').custom(productExistsById),
    validateBody
], destroy);

module.exports = router;