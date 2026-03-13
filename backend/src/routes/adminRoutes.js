const express = require('express');
const AdminController = require('../controllers/admin/adminController');
const router = express.Router();

router.post('/', AdminController.createItem);
router.put('/:id', AdminController.editItem);
router.delete('/:id', AdminController.deleteItem);

router.post('/active-ingredient', AdminController.createActiveIngredient);
router.put('/active-ingredient/:id', AdminController.editActiveIngredient);
router.delete('/active-ingredient/:id', AdminController.deleteActiveIngredient);

module.exports = router;
