const express = require('express');
const AdminController = require('../controllers/admin/adminController');
const router = express.Router();

router.post('/', AdminController.createItem);
router.put('/:id', AdminController.editItem);
router.delete('/:id', AdminController.deleteItem);

router.post('/active-ingredient', AdminController.createActiveIngredient);
router.post('/active-ingredient/:id', AdminController.editActiveIngredient);

module.exports = router;
