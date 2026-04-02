const fs = require("fs/promises");
const path = require("path");
const genPrivateKey = require('../utils/genPrivateKey');

const JWT_KEY_FILENAME = path.join(__dirname, "../../jwtPrivateKey.pem");

const rotateJwt = async () => {
    genPrivateKey(async (err, key) => {
        if (key) {
            try {
                await fs.writeFile(JWT_KEY_FILENAME, key);
                console.log("JWT private key rotated.")
            } catch (err) {
                console.log("Failed to write JWT private key:", err);
            }
        }
    })
};

module.exports = rotateJwt;