const fs = require('file-system')
const jwt = require('jsonwebtoken');

// check if user is authenticated
authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({message: 'Access denied.'});

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

            req.email = decoded.email;
            next();
        });
    });
};

module.exports = authMiddleware;
