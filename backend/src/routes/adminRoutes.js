const express = require('express');
const AdminController = require('../controllers/adminController');
const router = express.Router();

router.delete('/:id', AdminController.delete);
router.put('/:id', AdminController.edit);
router.post('/', AdminController.create);

module.exports = router;