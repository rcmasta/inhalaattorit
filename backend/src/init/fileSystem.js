const fs = require('fs/promises');
const path = require('path');

const DATA_FOLDER = path.join(__dirname, "../../data");

const initFolders = async () => {
    const dirs = [
        "uploads", "uploads/full", "uploads/thumb", "uploads/tmp", "db", "admindata"
    ];

    await fs.mkdir(DATA_FOLDER, { recursive: true })
    console.log('Ensured directory: ', DATA_FOLDER);

    for (const dir of dirs) {
        const dirPath = path.join(DATA_FOLDER, dir);

        await fs.mkdir(dirPath, { recursive: true })
        console.log('Ensured directory: ', dirPath);
    }
};

const initFiles = async () => {

    const filePath = path.join(DATA_FOLDER, "admindata", "admins.json");

    await fs.writeFile(filePath, JSON.stringify(null, null, 2), "utf-8");
    console.log('Ensured file: ', filePath);
};

const initFileSystem = async () => {
    console.log('');
    await initFolders();
    await initFiles();
    console.log('');
}

module.exports = initFileSystem;