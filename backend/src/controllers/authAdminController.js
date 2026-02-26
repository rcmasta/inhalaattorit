const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('file-system');
const BackendError = require('../classes/backendError');

// assuming there will be only one or maybe even two admins,
// having them in a json file should be sufficient.
const ADMINS_DATA = 'data/admins.json';

const INVALID_CREDENTIALS = 'Invalid credentials.';

class authAdminController {
    static postLogin = async (req, res, next) => {
        // get username and password from request.
        const {username, password} = req.body;

        // read admins from file
        await fs.readFile(ADMINS_DATA, "utf-8", async (err, data) => {
            if (err) return next(err);

            const admins = JSON.parse(data);

            // get admin from admins
            const admin = admins.find(a => a.username === username);
            try {
                // check if admin with given username exists
                if (!admin) throw new BackendError(401, INVALID_CREDENTIALS);

                // match the hash of the given password to the stored hash
                if (!await bcrypt.compare(password, admin.password)) {
                    throw new BackendError(401, INVALID_CREDENTIALS);
                }

            } catch (err) {
                return next(err);
            }

            // read the private key for signing tokens
            await fs.readFile('jwtPrivateKey.pem', 'utf-8', (err, data) => {
                if (err) return next(err);

                // sign the token
                const token = jwt.sign({email: admin.email}, data, {algorithm: 'RS256', expiresIn: '1h'});
                return res.status(200).json({token, message: 'Authenticated successfully.'});

            });
        });
    };
}

module.exports = authAdminController;
