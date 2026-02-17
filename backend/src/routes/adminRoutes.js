const express = require('express');
const AdminController = require('../controllers/adminController');
const router = express.Router();

// test function 
router.get('/get', AdminController.getItem);
router.post('/', AdminController.createItem);
router.put('/:id', AdminController.editItem);
router.delete('/:id', AdminController.deleteItem);

module.exports = router;