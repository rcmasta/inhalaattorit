const path = require('path');
const initJwtKey = require('./jwtKey');
const initFileSystem = require('./fileSystem');

// start schedhuled jobs
require('../jobs/schedule');

const serverInit = async () => {
    await initFileSystem();
    initJwtKey();
};

module.exports = serverInit;