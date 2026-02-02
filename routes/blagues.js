const express = require('express');
const router = express.Router();
const blagueController = require('../controllers/blagueController');

router.post('/', blagueController.create);
router.get('/random', blagueController.random);
router.get('/', blagueController.list);
router.get('/:id', blagueController.getById);

module.exports = router;
