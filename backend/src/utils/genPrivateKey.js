const openssl = require('openssl-nodejs');

function genPrivateKey(callback) {
    openssl('genrsa 2048', (err, buffer) => {
        // apparently the err here is not useful due to how the library is made lol...

        // pass the generated key as a string
        callback(null, buffer.toString());
    });
};

module.exports = genPrivateKey;
