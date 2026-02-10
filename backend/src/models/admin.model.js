const db = require('../config/db');


const dbAdd = (info) => {
    try {
        const query = "INSERT INTO medicine (name, image_path, description, age_group_id, " + 
                      "dosage_id, inhalation_requirement_id, inhaler_id, color_id) " +
                      "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const stmt = db.prepare(query);

        // get information from info
        const { name, image_path, description, age_group_id, dosage_id, 
                inhalation_requirement_id, inhaler_id, color_id } = info;

        // add info to database
        const info = stmt.run(name, image_path, description, age_group_id, dosage_id,
                              inhalation_requirement_id, inhaler_id, color_id);

        // print for testing
        console.log("Added row (id:", info.lastInsertRowid, ")");
        
    } catch (err) {
        throw err;
    }
};

const dbEdit = (info) => {
    try {
        // take id separate from update fields
        const { id, ...updates} = info;

        // add dynamicly all fields needed to update
        const fields = Object.keys(updates).map(key => `${key} = ?`).join(", ");
        const values = Object.values(updates);

        // update db
        const query = `UPDATE medicine SET ${fields} WHERE id = ?`;
        const stmt = db.prepare(query);
        const info = stmt.run(...values, id);

        // print for testing
        console.log("Updated row");
        
    } catch (err) {
        throw err;
    }
};

const dbRemove = (id) => {
    try {
        // remove id from db
        const query = "DELETE FROM medicine WHERE id = ?";
        const stmt = db.prepare(query);
        const info = stmt.run(id);

        // print for testing
        console.log("Deleted row");
        
    } catch (err) {
        throw err;
    }
};

module.exports = { dbAdd, dbEdit, dbRemove }