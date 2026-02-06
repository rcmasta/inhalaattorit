const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");


const dbPath = path.join(__dirname, "inhalers.db");
const db = new Database(dbPath, {
    busyTimeout: 5000
});

db.pragma("foreign_keys = ON");
db.pragma('journal_mode = WAL');

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
if (tables.length === 0) {
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
    db.exec(schema);
    console.log("Database schema initialized!")
}

module.exports = db;