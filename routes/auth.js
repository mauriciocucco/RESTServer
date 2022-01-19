const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const validateBody  = require('../middlewares/validateBody');

const router = Router();

router.post('/login', [
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'Send a valid email.').isEmail(),
    check('password', 'Password is required.').not().isEmpty(),
    validateBody
], login);

module.exports = router;