const { Router } = require('express');

const { authenticateToken } = require('../lib/middlewares/validateSession');
const validateRole = require('../lib/middlewares/validateRole');

const {
  getItems,
  createItem,
  getItem,
  updateItem,
} = require('../controllers/guest.controller');

const router = Router();

router.use(authenticateToken);

router.get('/', getItems);
router.post('/', validateRole, createItem);
router.get('/:id', getItem);
router.patch('/:id', validateRole, updateItem);

module.exports = router;
