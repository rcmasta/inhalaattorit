const rateLimit = require('express-rate-limit');

const limiterBasic = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 500
});

const limiterAdminLogin = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 10
});



module.exports = {
    limiterBasic,
    limiterAdminLogin
};