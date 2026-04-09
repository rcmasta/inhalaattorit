const openssl = require('openssl-nodejs');

// use cryptographically secure random data to generate a password
const genPassword = (passwordLen, callback) => {
    openssl(`openssl rand ${passwordLen*10}`, (err, buffer) => {
        const pw = buffer.toString('utf-8')
                    .replace(/[^a-z0-9]/gi, '')
                    .slice(0, passwordLen);

        if (pw.length != passwordLen) {
            return callback(Error("Failed to generate password!"), null);
        }
        
        return callback(null, pw);
    });
};

module.exports = genPassword;
