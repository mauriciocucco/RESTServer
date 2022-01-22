const { Router } = require('express');
const { check } = require('express-validator');
const { validateBody, validateJWT, isAdmin } = require('../middlewares');
const { roleValidator, userValidator } = require('../lib/dbValidators');
const { index, show, store, update, destroy } = require('../controllers/categories');
const router = Router();

router.get('/', index);

router.get('/:id', show);

router.post('/', [
    validateJWT,
    validateBody
], store);

router.put('/:id', [
    validateJWT,
    check('id', 'The id is not valid.').isMongoId(),
    check('id').custom(userValidator),
    check('role', 'The role is mandatory.').not().isEmpty(),
    check('role').custom(role => roleValidator(role, 'put')),
    validateBody
], update);

router.delete('/:id', [
    validateJWT,
    check('id', 'The id is not valid.').isMongoId(),
    check('id').custom(userValidator),
    check('role', 'The role is mandatory.').not().isEmpty(),
    check('role').custom(role => roleValidator(role, 'put')),
    isAdmin,
    validateBody
], destroy);

module.exports = router;