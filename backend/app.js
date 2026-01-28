const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

//app.use(express.static(path.join(__dirname, '../../frontend')));

//Routes
app.use('/api/user', require('./src/routes/inhalersRoutes'));
app.use('/api/admin', require('./src/routes/authAdminRoutes'));
app.use('/api/admin/inhalers', require('./src/routes/adminRoutes'));

// Error handling middleware
//app.use(require('middleware/errorMiddleware'));


module.exports = app;