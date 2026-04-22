const openssl = require('openssl-nodejs');

function genPrivateKey() {
    return new Promise((resolve, reject) => {
        openssl('genrsa 2048', (err, buffer) => {
            if (buffer) resolve(buffer.toString()); 
            else reject(Error('Failed to generate a key.'));
        });
    });
};

module.exports = genPrivateKey;
