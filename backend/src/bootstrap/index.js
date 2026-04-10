const initJwtKey = require('./jwtKey');
const initFileSystem = require('./fileSystem');

const bootstrapApp = async () => {
    console.log(`\n[Bootstrap] ${new Date().toLocaleString()}`);

    await initFileSystem();
    initJwtKey();

    // start schedhuled jobs
    require('../jobs/schedule');
};

module.exports = bootstrapApp;