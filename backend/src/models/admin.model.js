const db = require('../config/db');


const dbAdd = (itemdata) => {
    try {
        // dynamically set given values to medicine
        const columns = Object.keys(itemdata);
        const placeholders = columns.map(key => `@${key}`)
                                    .join(", ");

        // build query and append to db
        const query = `INSERT INTO medicine (${columns.join(", ")}) VALUES (${placeholders})`;
        const stmt = db.prepare(query);
        const result = stmt.run(itemdata);

        // print for testing
        console.log("Added row (id:", result.lastInsertRowid, ")");
        
    } catch (err) {
        throw err;
    }
};

const dbEdit = (id, updates) => {
    try {
        // add dynamicly all fields needed to update
        const fields = Object.keys(updates)
                      .map(key => `${key} = @${key}`)
                      .join(", ");

        // update db
        const query = `UPDATE medicine SET ${fields} WHERE id = @id`;
        const stmt = db.prepare(query);
        const result = stmt.run({...updates, id});

        // print for testing
        console.log("Updated row");
        
    } catch (err) {
        throw err;
    }
};

const dbRemove = (id) => {
    try {
        // remove id from db
        const query = "DELETE FROM medicine WHERE id = @id";
        const stmt = db.prepare(query);
        const result = stmt.run({id});

        // print for testing
        console.log("Deleted row");
        
    } catch (err) {
        throw err;
    }
};

module.exports = { dbAdd, dbEdit, dbRemove }