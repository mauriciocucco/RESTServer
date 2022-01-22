const { Router } = require('express');
const { check } = require('express-validator');
const { index, store, update, destroy, paginated } = require('../controllers/users');
const { validateBody, validateJWT, isAdmin } = require('../middlewares');
const { roleValidator, emailPostValidator, userValidator } = require('../lib/dbValidators');

const router = Router();

router.get('/', validateJWT, index);

router.get('/paginated', validateJWT, paginated);

router.post('/', [
    validateJWT,
    check('name', 'The name is mandatory.').not().isEmpty(),
    check('email', 'The email is not valid.').isEmail(),
    check('email').custom(emailPostValidator),
    check('password', 'The password is mandatory.').not().isEmpty(),
    check('password', 'The password must have a minimum of 6 characters.').isLength({min: 6}),
    check('role', 'The role is mandatory.').not().isEmpty(),
    // check('role', 'The role is not valid.').isIn(['USER', 'ADMIN']),
    check('role').custom(role => roleValidator(role)),
    isAdmin,
    validateBody
], store);

router.put('/:id', [
    validateJWT,
    check('id', 'The id is not valid.').isMongoId(),
    check('id').custom(userValidator),
    check('role', 'The role is mandatory.').not().isEmpty(),
    check('role').custom(role => roleValidator(role, 'put')),
    isAdmin,
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