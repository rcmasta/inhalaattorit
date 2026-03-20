const express = require('express');
const adminController = require('../controllers/admin/adminController');
const router = express.Router();
const multer = require('multer');

router.post('/inhalers', adminController.inhalers.create);
router.put('/inhalers/:id', adminController.inhalers.edit);
router.delete('/inhalers/:id', adminController.inhalers.delete);

// inhaler pictures
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/uploads/:id', upload.single('image'), adminController.uploads.add);
router.delete('/uploads/:id', adminController.uploads.delete);

router.get('/active-ingredient', adminController.activeIngredient.get)
router.post('/active-ingredient', adminController.activeIngredient.create);
router.put('/active-ingredient/:id', adminController.activeIngredient.edit);
router.delete('/active-ingredient/:id', adminController.activeIngredient.delete);

router.get('/drug-class', adminController.drugClass.get);
router.post('/drug-class', adminController.drugClass.create);
router.put('/drug-class/:id', adminController.drugClass.edit);
router.delete('/drug-class/:id', adminController.drugClass.delete);

module.exports = router;
