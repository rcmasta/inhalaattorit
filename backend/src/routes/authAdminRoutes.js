const express = require('express');
const authAdminController = require('../controllers/authAdminController');
const router = express.Router();

router.post('/login', authAdminController.postLogin);

module.exports = router;
