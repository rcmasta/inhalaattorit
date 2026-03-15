const express = require('express');
const AdminController = require('../controllers/admin/adminController');
const router = express.Router();

router.post('/', AdminController.createItem);
router.put('/:id', AdminController.editItem);
router.delete('/:id', AdminController.deleteItem);

router.get('/active-ingredient', AdminController.getActiveIngredients)
router.post('/active-ingredient', AdminController.createActiveIngredient);
router.put('/active-ingredient/:id', AdminController.editActiveIngredient);
router.delete('/active-ingredient/:id', AdminController.deleteActiveIngredient);

router.get('/drug-class', AdminController.drugClassController.getDrugClasses);
router.post('/drug-class', AdminController.drugClassController.createDrugClass);
router.put('/drug-class/:id', AdminController.drugClassController.editDrugClass);
router.delete('/drug-class/:id', AdminController.drugClassController.deleteDrugClass);

module.exports = router;
