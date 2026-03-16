const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const cron = require('node-cron');
const fs = require('fs');
const genPrivateKey = require('./src/utils/genPrivateKey');

const JWT_PRIVATE_KEY = 'jwtPrivateKey.pem';

// routes
const inhalersRoutes = require('./src/routes/inhalersRoutes');
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

// middleware
const authMiddleware = require('./src/middleware/authMiddleware');
const { limiterBasic, limiterAdminLogin} = require('./src/middleware/rateLimitMiddleware');
const errorMiddleware = require('./src/middleware/errorMiddleware.js');

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.use(express.static(path.join(__dirname, '../frontend')));

//Routes
app.use('/api/inhalers', limiterBasic, inhalersRoutes);
app.use('/api/admin/login', limiterAdminLogin, authRoutes);
app.use('/api/admin', limiterBasic, authMiddleware, adminRoutes);

// Error handling middleware
app.use(errorMiddleware);

// on launch synchronously generate a private key for signing jwts if it doesn't already exist
if (!fs.existsSync(JWT_PRIVATE_KEY)) {
    genPrivateKey((err, key) => {
        if (key) fs.writeFileSync('jwtPrivateKey.pem', key);
        else console.log('Failed to generate a JWT private key.');
    });
}

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
