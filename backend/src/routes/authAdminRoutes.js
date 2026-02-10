const express = require('express');
const AdminController = require('../controllers/adminController');
const router = express.Router();

router.post('/login', authAdminController.loginPost);

module.exports = router;
