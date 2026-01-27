const express = require('express');
const inhalersController = require('../controllers/inhalersController');
const router = express.Router();

router.get('/', inhalersController.getInhalers);


module.exports = router;