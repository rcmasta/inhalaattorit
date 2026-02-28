const {getAdmin, verifyPassword, signToken} = require('../models/auth.model');
const BackendError = require('../classes/backendError');

const INVALID_CREDENTIALS = 'Invalid credentials.';

class authAdminController {
    static postLogin = async (req, res, next) => {
        // get username and password from request.
        const {username, password} = req.body;

        // get admin with the given username,
        // if admin is null the given credentials are invalid
        const admin = await getAdmin(username);
        if (!admin) return next(new BackendError(401, INVALID_CREDENTIALS));

        // validate the given password of the valid admin
        if (!await verifyPassword(admin, password)) return next(new BackendError(401, INVALID_CREDENTIALS));

        // sign and return a jwt
        await signToken(admin, (err, token) => {
            if (err) return next(err);
            return res.status(200).json({token, message: 'Authenticated successfully.'});
        });
    };
}

module.exports = authAdminController;
