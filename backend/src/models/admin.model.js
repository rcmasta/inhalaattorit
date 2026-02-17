const db = require('../config/db');


const dbAdd = (info) => {
    try {
        const query = "INSERT INTO medicine (" +
                        "name, image_path, description, official_min_age, recommended_min_age, " +
                        "times_a_day, good_intake_speed, good_coordination, treatment_medicine, " +
                        "symptomatic_medicine, inhaler_brand_id) " + 
                      "VALUES (" +
                        "@name, @image_path, @description, @official_min_age, @recommended_min_age, " +
                        "@times_a_day, @good_intake_speed, @good_coordination, @treatment_medicine, " +
                        "@symptomatic_medicine, @inhaler_brand_id);"
        const stmt = db.prepare(query);

        // add info to database
        const result = stmt.run(info);

        // print for testing
        console.log("Added row (id:", result.lastInsertRowid, ")");
        
    } catch (err) {
        throw err;
    }
};

const dbEdit = (info) => {
    try {
        // take id separate from update fields
        const { id, ...updates} = info;

        // add dynamicly all fields needed to update

        const fields = Object.keys(updates)
                      .map(key => `${key} = @${key}`)
                      .join(", ");

        // update db
        const query = `UPDATE medicine SET ${fields} WHERE id = @id`;
        const stmt = db.prepare(query);
        const result = stmt.run(info);

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