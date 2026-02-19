const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('file-system');

// assuming there will be only one or maybe even two admins,
// having them in a json file should be sufficient.
const ADMINS_DATA = 'data/admins.json';

const INVALID_CREDENTIALS = 'Invalid credentials.';
const ERROR = 'An error occurred.';

class authAdminController {
    static postLogin = async (req, res) => {
        // get username and password from request.
        const {username, password} = req.body;

        // read admins from file
        await fs.readFile(ADMINS_DATA, "utf-8", async (err, data) => {
            if (err) return res.status(500).json({message: ERROR});

            const admins = JSON.parse(data);

            // check if admin with given username exists
            const admin = admins.find(a => a.username === username);
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


        });
    };
}

module.exports = authAdminController;
