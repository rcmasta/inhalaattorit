const path = require ('path');
const fs = require('fs');
const genPrivateKey = require('../utils/genPrivateKey');

const initJwtKey = () => {
    const jwtKeyFilename = path.join(__dirname, "../../jwtPrivateKey.pem");

    // on launch synchronously generate a private key for signing jwts if it doesn't already exist
    if (!fs.existsSync(jwtKeyFilename)) {
        console.log('Generating private JWT key');
        genPrivateKey((err, key) => {
            if (key) { fs.writeFileSync(jwtKeyFilename, key); }
            else { console.log('Failed to generate a JWT private key.'); }
        });
        console.log('');
    }
};

module.exports = initJwtKey;