const db = require('../config/db');

const dbAdd = (itemdata) => {
    try {
        const stmtAddMedicine = db.prepare(
            "INSERT INTO medicine (" +
            "name, image_path, official_min_age, recommended_min_age, times_a_day, " +
            "good_intake_speed, good_coordination, treatment_medicine, symptomatic_medicine, " +
            "inhaler_brand_id) " +
            "VALUES (" +
            "@name, @image_path, @official_min_age, @recommended_min_age, @times_a_day," +
            "@good_intake_speed, @good_coordination, @treatment_medicine, @symptomatic_medicine, " +
            "@inhaler_brand_id)");

        // run medicine insert query
        let stmt = db.prepare(addQuery1);
        let res = stmt.run(itemdata);

        // get medicine_id
        const medicine_id = res.lastInsertRowid;

        // add relations to other tables
        insertMedicineRelations(medicine_id, itemdata);

        // print for testing
        console.log("Added row (id:", medicine_id, ")");
        
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

const insertMedicineRelations = db.transaction((medicine_id, itemdata) => {

    const stmtAddDesc = db.prepare(
        "INSERT INTO medicine_translation (medicine_id, language, description) " +
        "VALUES (@medicine_id, @language, @desc)");

    const stmtAddIntake = db.prepare(
        "INSERT INTO medicine_intake_style (medicine_id, intake_style_id) " +
        "VALUES (@medicine_id, @intake_style_id)");

    const stmtAddActive = db.prepare(
        "INSERT INTO medicine_active_ingredient (medicine_id, active_ingredient_id) " +
        "VALUES (@medicine_id, @active_ingredient_id)");

    const stmtAddColor = db.prepare(
        "INSERT INTO medicine_color (medicine_id, color_id) " +
        "VALUES (@medicine_id, @color_id)");


    //add descriptions
    for (const [language, desc] of Object.entries(itemdata.description)) {
        stmtAddDesc.run({medicine_id, language, desc});
    }
    // add intake styles
    for (const intake_style_id of itemdata.intake_style) {
        stmtAddIntake.run({medicine_id, intake_style_id});
    }
    // add active ingredients
    for (const active_ingredient_id of itemdata.active_ingredient) {
        stmtAddActive.run({medicine_id, active_ingredient_id});
    }
    // add colors
    for (const color_id of itemdata.color) {
        stmtAddColor.run({medicine_id, color_id});
    }
})

module.exports = { dbAdd, dbEdit, dbRemove }