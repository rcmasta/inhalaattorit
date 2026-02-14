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
        // TODO: consider where the private key should be
        await fs.readFile(__dirname + '/../../private.key', 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json({message: ERROR});
            }

            const token = jwt.sign({email: admin.email}, data, {algorithm: 'RS256', expiresIn: '1h'});
            return res.status(200).json({token, message: 'Authenticated successfully.'});

        }); 

    };
}

module.exports = authAdminController;
