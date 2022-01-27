const { Router } = require('express');
const { check } = require('express-validator');
const { index, store, update, destroy, paginated } = require('../controllers/users');
const { validateBody, validateJWT, isAdmin } = require('../middlewares');
const { emailPostValidator, userExists } = require('../lib/userValidators');
const { roleExists } = require('../lib/roleValidators');

const router = Router();

router.get('/', validateJWT, index);

router.get('/paginated', validateJWT, paginated);

router.post('/', [
    validateJWT,
    isAdmin,
    check('name', 'The name is mandatory.').not().isEmpty(),
    check('email', 'The email is not valid.').isEmail(),
    check('email').custom(emailPostValidator),
    check('password', 'The password is mandatory.').not().isEmpty(),
    check('password', 'The password must have a minimum of 6 characters.').isLength({min: 6}),
    check('role', 'The role is mandatory.').not().isEmpty(),
    // check('role', 'The role is not valid.').isIn(['USER', 'ADMIN']),
    check('role').custom(role => roleExists(role)),
    validateBody
], store);

router.put('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'The id is not valid.').isMongoId(),
    check('id').custom(userExists),
    check('role').custom(role => roleExists(role, 'put')),
    validateBody
], update);

router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'The id is not valid.').isMongoId(),
    check('id').custom(userExists),
    validateBody
], destroy);

module.exports = router;