const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "inhalers.db");
const db = new Database(dbPath, {
    busyTimeout: 5000
});

db.pragma("foreign_keys = ON");
db.pragma('journal_mode = WAL');

