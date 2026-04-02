const fs = require("fs/promises");
const path = require("path");

const UPLOADS_TEMP = path.join(__dirname, "../../data/uploads/tmp");
const MAX_AGE = 24 * 60 * 60 * 1000; // removes files older than 1 day

const cleanTmp = async () => {
    try {
        const files = await fs.readdir(UPLOADS_TEMP);
        const now = Date.now();

        for (const file of files) {
            const filePath = path.join(UPLOADS_TEMP, file);
            const stat = await fs.stat(filePath);
            
            if (now - stat.mtimeMs > MAX_AGE) {
                await fs.unlink(filePath);
            }
        }
        console.log("Uploads tmp cleanup done!");
    } catch {
        console.log("Uploads tmp cleanup failed!");
    }
};

module.exports = cleanTmp;
