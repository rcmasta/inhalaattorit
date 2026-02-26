const db = require('../config/db');

const stmtDesc = db.prepare(
    "INSERT INTO medicine_translation (medicine_id, language, description) " +
    "VALUES (@medicine_id, @language, @desc) " +
    "ON CONFLICT(medicine_id, language) " +
    "DO UPDATE SET description = excluded.description"
);

const stmtRemoveIntake = db.prepare(
    "DELETE FROM medicine_intake_style WHERE medicine_id = @medicine_id"
);
const stmtIntake = db.prepare(
    "INSERT INTO medicine_intake_style (medicine_id, intake_style_id) " +
    "VALUES (@medicine_id, @intake_style_id)"
);

const stmtRemoveActive = db.prepare(
    "DELETE FROM medicine_active_ingredient WHERE medicine_id = @medicine_id"
);
const stmtActive = db.prepare(
    "INSERT INTO medicine_active_ingredient (medicine_id, active_ingredient_id) " +
    "VALUES (@medicine_id, @active_ingredient_id)"
);

const stmtRemoveColor = db.prepare(
    "DELETE FROM medicine_color WHERE medicine_id = @medicine_id"
);
const stmtColor = db.prepare(
    "INSERT INTO medicine_color (medicine_id, color_id) " +
    "VALUES (@medicine_id, @color_id)"
);

const medicineFields = [
    "name",
    "image_path",
    "official_min_age",
    "recommended_min_age",
    "times_a_day",
    "good_intake_speed",
    "good_coordination",
    "treatment_medicine",
    "symptomatic_medicine",
    "inhaler_brand_id"
];

const dbAdd = db.transaction((itemdata) => {
    try {
        const stmtAddMedicine = db.prepare(
            `INSERT INTO medicine (${medicineFields.join(", ")})
             VALUES (${medicineFields.map(f => "@" + f).join(", ")})`
        );

        let res = stmtAddMedicine.run(itemdata);

        // get medicine_id
        const medicine_id = res.lastInsertRowid;

        // add relations to other tables
        insertDesc(medicine_id, itemdata.description);
        insertStyle(medicine_id, itemdata.intake_styles);
        insertActive(medicine_id, itemdata.active_ingredients);
        insertColor(medicine_id, itemdata.colors);

        // print for testing
        console.log("Added row (id:", medicine_id, ")");
        
    } catch (err) {
        throw err;
    }
});

const dbEdit = db.transaction((id, updates) => {
    try {
        // add dynamicly all fields needed to update
        const updatedMedicineFields = Object.keys(updates).filter(f => medicineFields.includes(f));

        if (updatedMedicineFields.length > 0) {
            const setClause = updatedMedicineFields.map(f => `${f} = @${f}`).join(", ");
            db.prepare(`UPDATE medicine SET ${setClause} WHERE id = @id`).run({...updates, id});
        }

        if ("description" in updates && Object.keys(updates.description).length > 0) {
            insertDesc(id, updates.description);
        }

        if ("intake_styles" in updates && Object.keys(updates.intake_styles).length > 0) {
            insertStyle(id, updates.intake_styles);
        }

        if ("active_ingredients" in updates && Object.keys(updates.active_ingredients).length > 0) {
            insertActive(id, updates.active_ingredients);
        }

        if ("colors" in updates && Object.keys(updates.colors).length > 0) {
            insertColor(id, updates.colors);
        }

        // print for testing
        console.log("Updated row");
        
    } catch (err) {
        throw err;
    }
});

const dbRemove = db.transaction((id) => {
    try {
        const res = db.prepare("DELETE FROM medicine WHERE id = @id").run({id});

        if (res.changes === 0) {
            console.log("No row with that id")
            return;
        }
        // print for testing
        console.log("Deleted row");
        
    } catch (err) {
        throw err;
    }
});

const insertDesc = (medicine_id, descriptions) => {
    // adds all description languages if already exists overrides the description with new one
    // otherwise create new one
    for (const [language, desc] of Object.entries(descriptions)) {
        stmtDesc.run({medicine_id, language, desc});
    }
};

const insertStyle = (medicine_id, intake_styles) => {
    // removes old relations of the medicine
    stmtRemoveIntake.run({medicine_id});

    // creates new relations
    for (const intake_style_id of intake_styles) {
        stmtIntake.run({medicine_id, intake_style_id});
    }
};

const insertActive = (medicine_id, active_ingredients) => {
    stmtRemoveActive.run({medicine_id});

    for (const active_ingredient_id of active_ingredients) {
        stmtActive.run({medicine_id, active_ingredient_id});
    }
};

const insertColor = (medicine_id, colors) => {
    stmtRemoveColor.run({medicine_id});

    for (const color_id of colors) {
        stmtColor.run({medicine_id, color_id});
    }
}

module.exports = { dbAdd, dbEdit, dbRemove }