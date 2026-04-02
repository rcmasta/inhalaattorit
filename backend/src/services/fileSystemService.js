const fsp = require('fs/promises');
const fs = require('fs');
const path = require('path');
const genPrivateKey = require('../utils/genPrivateKey');

const UPLOADS_FOLDER = path.join(__dirname, "../../data/uploads");
const JWT_KEY_FILENAME = path.join(__dirname, "../../jwtPrivateKey.pem");

const initJwtKey = () => {
    // on launch synchronously generate a private key for signing jwts if it doesn't already exist
    if (!fs.existsSync(JWT_KEY_FILENAME)) {
        genPrivateKey((err, key) => {
            if (key) { fs.writeFileSync(JWT_KEY_FILENAME, key); }
            else { console.log('Failed to generate a JWT private key.'); }
        });
    }
};

const initFolders = async () => {
    await Promise.all([
        fsp.mkdir(path.join(UPLOADS_FOLDER, "full"), { recursive: true }),
        fsp.mkdir(path.join(UPLOADS_FOLDER, "thumb"), { recursive: true }),
        fsp.mkdir(path.join(UPLOADS_FOLDER, "tmp"), { recursive: true }),
    ]);
};

const initFileSystem = async () => {
    initJwtKey();
    await initFolders();
};

module.exports = initFileSystem;