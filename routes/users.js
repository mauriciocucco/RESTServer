const { Router } = require('express');
const { index, store, update, destroy } = require('../controllers/users');

const router = Router();

router.get('/', index);

router.post('/', store);

router.put('/:id', update);

router.delete('/:id', destroy);

module.exports = router;