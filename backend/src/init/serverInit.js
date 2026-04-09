const path = require('path');
const initJwtKey = require('./jwtKey');
const initFileSystem = require('./fileSystem');
const populateDatabase = require('../config/populate_db/populateDB');

// start schedhuled jobs
require('../jobs/schedule');

const XLSX_FILE_PATH = path.join(__dirname, '../../taulukko.xlsx');

const serverInit = async () => {
    await initFileSystem();
    await populateDatabase(XLSX_FILE_PATH);

    initJwtKey();
};

module.exports = serverInit;