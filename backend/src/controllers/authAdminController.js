const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('file-system');

// TODO: get admins from db
// const admins = require('');

const INVALID_CREDENTIALS = 'Invalid credentials.';
const ERROR = 'An error occurred.';

class authAdminController {
    static postLogin = async (req, res) => {
        // get email and password from request.
        const {email, password} = req.body;

        // check if admin with given email exists
        const admin = admins.find(a => a.email === email);
        if (!admin) return res.status(401).json({message: INVALID_CREDENTIALS});

        // match the hash of the given password to the stored hash
        try {
            if (!await bcrypt.compare(password, admin.password)) {
                return res.status(401).json({message: INVALID_CREDENTIALS});

            }

        } catch (error) {
            return res.status(500).json({message: ERROR});

        }

        // sign and send token
        try {
            // read the private key for signing tokens
            await fs.readFile('jwtPrivateKey.pem', 'utf-8', (err, data) => {
                if (err) {
                    return res.status(500).json({message: ERROR});
                }

                // sign the token
                const token = jwt.sign({email: admin.email}, data, {algorithm: 'RS256', expiresIn: '1h'});
                return res.status(200).json({token, message: 'Authenticated successfully.'});

            });

        } catch (err) {
            return res.status(500).json({message: ERROR});
        }
    };
}

module.exports = authAdminController;
