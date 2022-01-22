const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const validateBody  = require('../middlewares/validateBody');

const router = Router();

router.post('/login', [
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'Send a valid email.').isEmail(),
    check('password', 'Password is required.').not().isEmpty(),
    validateBody
], login);

router.post('/google', [
    check('id_token', 'Google token is required.').not().isEmpty(),
    validateBody
], googleSignIn);

module.exports = router;