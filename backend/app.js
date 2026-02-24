const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const cron = require('node-cron');
const fs = require('fs');
const genPrivateKey = require('./src/utils/genPrivateKey');

// routes
const inhalersRoutes = require('./src/routes/inhalersRoutes');
const authAdminRoutes = require('./src/routes/authAdminRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

// middleware
const authMiddleware = require('./src/middleware/authMiddleware');
const { limiterBasic, limiterAdminLogin} = require('./src/middleware/rateLimitMiddleware')

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.use(express.static(path.join(__dirname, '../frontend')));

//Routes
app.use('/api/inhalers', limiterBasic, inhalersRoutes);
app.use('/api/admin', limiterAdminLogin, authAdminRoutes);
app.use('/api/admin/inhalers', limiterBasic, authMiddleware, adminRoutes);

// Error handling middleware
//app.use(require('middleware/errorMiddleware'));

// cron job for rotating the jwt private key.
// rotates the key at midnight.
cron.schedule('0 0 * * *', () => {
    genPrivateKey(async (err, key) => {
        if (key) {
            await fs.writeFile("jwtPrivateKey.pem", key, (err) => {
                if (err) {
                    console.log("Failed to write JWT private key:", err);

                } else {
                    console.log("JWT private key rotated.")

                }
            });
        }
    });
});

module.exports = app;
