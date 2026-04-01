const cron = require("node-cron");
const fs = require("fs/promises");
const path = require("path");

const UPLOADS_TEMP = path.join(__dirname, "../../data/uploads/tmp");

const MAX_AGE = 24 * 60 * 60 * 1000; // removes files older than 1 day
const CLEANUP_TIME = "0 3 * * *"; // daily 03:00

cron.schedule(CLEANUP_TIME, async () => {
    try {
        console.log("Running uploads temp cleanup...");

        const files = await fs.readdir(UPLOADS_TEMP);
        const now = Date.now();

        for (const file of files) {
            const filePath = path.join(UPLOADS_TEMP, file);
            const stat = await fs.stat(filePath);
            
            if (now - stat.mtimeMs > MAX_AGE) {
                await fs.unlink(filePath);
            }
        }
        console.log("Cleanup done!");
    } catch {
        console.log("Cleanup failed!");
    }
});
