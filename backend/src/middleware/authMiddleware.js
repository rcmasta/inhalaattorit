const fs = require('file-system')

// check if user is authenticated
authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({message: 'Access denied.'});

    try {
        // decode token 
        const privateKey = fs.readFileSync(__dirname + '/../../private.key'); // TODO: consider where the private key should be
        const decoded = jwt.verify(token, privateKey);
        req.email = decoded;
        next();

    } catch (error) {
        res.status(400).json({message: 'Invalid token.'});
    }
};

module.exports = authMiddleware;
