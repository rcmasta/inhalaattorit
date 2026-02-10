const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");


const db = new Database(path.join(__dirname, "test_inhalers.db"));

db.pragma("foreign_keys = ON");

// If database empty, fill in with with schema and seed attributes
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
if (tables.length === 0) {
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
    db.exec(schema);
    console.log("Database schema initialized!");

    const seed = fs.readFileSync(path.join(__dirname, "seed.sql"), "utf-8");
    db.exec(seed);
    console.log("Database seeded!");
}

module.exports = db;