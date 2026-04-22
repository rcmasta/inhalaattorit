const fs = require("fs/promises");
const path = require("path");
const genPrivateKey = require('../utils/genPrivateKey');

const JWT_KEY_FILENAME = path.join(__dirname, "../../jwtPrivateKey.pem");

const rotateJwt = async () => {
    try {
        const key = await genPrivateKey();
        await fs.writeFile(JWT_KEY_FILENAME, key);
        console.log("JWT private key rotated.");

    } catch {
        console.log('Failed to rotate JWT private key!');
    }
};

module.exports = rotateJwt;
