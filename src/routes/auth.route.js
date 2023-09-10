const { Router } = require('express');

const { registerItem, loginItem } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', loginItem);
router.post('/register', registerItem);

module.exports = router;
