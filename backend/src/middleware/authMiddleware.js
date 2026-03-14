const fs = require('file-system')
const jwt = require('jsonwebtoken');
const BackendError = require('../classes/backendError');

// check if user is authenticated
authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) throw new BackendError(401, 'Access denied.');
    const token = authHeader.replace('Bearer ', '');

    // read the private key used for signing tokens
    await fs.readFile("jwtPrivateKey.pem", "utf-8", async (err, privateKey) => {
        if (err) return next(err);

        // verify the token
        await jwt.verify(token, privateKey, (err, decoded) => {
            if (err) return next(err);

            req.username = decoded.username;
            next();
        });
    });
};

module.exports = authMiddleware;
