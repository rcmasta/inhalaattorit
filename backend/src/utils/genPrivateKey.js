const openssl = require('openssl-nodejs');

function genPrivateKey(callback) {
    openssl('genrsa 2048', (err, buffer) => {
        // apparently the err here is not useful due to how the library is made lol...
        if (!buffer) return callback(Error('Failed to generate a key.'), null);
        callback(null, buffer.toString());
    });
};

module.exports = genPrivateKey;
