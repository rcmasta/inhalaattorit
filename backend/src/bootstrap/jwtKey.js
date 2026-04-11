const path = require ('path');
const fs = require('fs/promises');
const genPrivateKey = require('../utils/genPrivateKey');

const initJwtKey = async () => {
    const jwtKeyFilename = path.join(__dirname, "../../jwtPrivateKey.pem");

    // generate a JWT private key if it doesn't exist already.
    try {
        await fs.access(jwtKeyFilename);

    } catch {
        genPrivateKey(async (err, key) => {
            // consider if an error should prevent the launch of the application;
            // missing JWT private key won't affect the normal use of the site, but admins won't be able to login.
            if (err) return console.log('Failed to generate a JWT private key!');

            await fs.writeFile(jwtKeyFilename, key);
            console.log('JWT private key generated');
        });
    }
};

module.exports = initJwtKey;
