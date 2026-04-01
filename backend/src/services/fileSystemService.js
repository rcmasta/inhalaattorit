const fs = require('fs/promises');
const path = require('path');

const UPLOADS_FOLDER = path.join(__dirname, "../../data/uploads")

const initFolders = async () => {
    await Promise.all([
        fs.mkdir(path.join(UPLOADS_FOLDER, "full"), { recursive: true }),
        fs.mkdir(path.join(UPLOADS_FOLDER, "thumb"), { recursive: true }),
        fs.mkdir(path.join(UPLOADS_FOLDER, "tmp"), { recursive: true }),
    ]);
};

module.exports = initFolders;