const path = require ('path');
const fs = require('fs/promises');
const genPrivateKey = require('../utils/genPrivateKey');

const initJwtKey = async () => {
    const jwtKeyFilename = path.join(__dirname, "../../jwtPrivateKey.pem");

    // generate a JWT private key if it doesn't exist already.
    try {
        await fs.access(jwtKeyFilename);

    } catch {
        const key = await genPrivateKey();

        if (key) {
            await fs.writeFile(jwtKeyFilename, key);
            console.log('JWT private key generated');

        } else {
            // consider if this should prevent the application from launching;
            // missing JWT private key won't affect the normal use of the site, but admins won't be able to login.
            console.log('Failed to generate a JWT private key!');
        }

        console.log('');
    }
};

module.exports = initJwtKey;
