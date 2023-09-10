const { Router } = require('express');

const { authenticateToken } = require('../lib/middlewares/validateSession');

const { getItems } = require('../controllers/department.controller');

const router = Router();

router.use(authenticateToken);

router.get('/', getItems);

module.exports = router;
