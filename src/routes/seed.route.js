const { Router } = require('express');

const { loadItems_1, loadItems_2 } = require('../controllers/seed.controller');

const router = Router();

router.get('/departments', loadItems_1);
router.get('/guests', loadItems_2);

module.exports = router;
