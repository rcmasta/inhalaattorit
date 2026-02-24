const fs = require('file-system')
const jwt = require('jsonwebtoken');

// check if user is authenticated
authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({message: 'Access denied.'});
    const token = authHeader.replace('Bearer ', '');

    // decode token 
    await fs.readFile("jwtPrivateKey.pem", "utf-8", async (err, privateKey) => {
        if (err) {
            return res.status(500).json({message: 'An error occurred.'});
        }

        // verify the token
        await jwt.verify(token, privateKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({message: 'Invalid token.'});
            }

            req.username = decoded.username;
            next();
        });
    });
};

module.exports = authMiddleware;
