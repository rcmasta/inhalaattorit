const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('file-system');

// assuming there will be only one or maybe even two admins,
// having them in a json file should be sufficient.
const admins = require('../../data/admins.json');

// returns an admin ({username, password}) with the given username (or null if not found)
const getAdmin = async (username) => {
    // find admin with the given username
    return await admins.find(a => a.username === username);
};

// returns true if the given password is valid for the given admin
const verifyPassword = async (admin, password) => {
    // validate the given password against the admin's stored hash
    return await bcrypt.compare(password, admin.password);
};

// signs a jwt for the given admin and passes it to the callback function
const signToken = async (admin, callback) => {
    // read the private key used for signing jwts
    await fs.readFile('jwtPrivateKey.pem', 'utf-8', async (err, data) => {
        if (err) return callback(err, null);

        // sign and return a jwt
        const token = await jwt.sign({username: admin.username}, data, {algorithm: 'RS256', expiresIn: '1h'});
        return callback(null, token);
    });
};

module.exports = {getAdmin, verifyPassword, signToken};
