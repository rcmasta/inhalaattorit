const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('file-system');

// TODO: get admins from db
// const admins = require('');

const INVALID_CREDENTIALS = 'Invalid credentials.';

class authAdminController {
    static postLogin = async (req, res) => {
        // get email and password from request.
        const {email, password} = req.body;

        // check if admin with given email exists
        const admin = admins.find(a => a.email === email);
        console.log(admin);
        if (!admin) return res.status(400).json({message: INVALID_CREDENTIALS});

        // match the hash of the given password to the stored hash
        try {
            if (!await bcrypt.compare(password, admin.password)) {
                return res.status(400).json({message: INVALID_CREDENTIALS});

            }

        } catch (error) {
            res.status(500).json({message: 'An error occurred.'});

        }

        // encrypt and send token
        const privateKey = fs.readFileSync(__dirname + '/../../private.key'); // TODO: consider where the private key should be
        const token = jwt.sign({email: admin.email}, privateKey, {algorithm: 'RS256', expiresIn: '1h'});
        res.status(200).json({token, message: "Authenticated successfully"});
    };
}

module.exports = authAdminController;
