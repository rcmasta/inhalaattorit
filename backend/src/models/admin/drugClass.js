const db = require('../../config/db');

const dbGetDrugClasses = () => {
    const drugClasses = db.prepare(
        "SELECT * FROM drug_class"
    ).all();

    return drugClasses;
};

const dbCreateDrugClass = db.transaction((name) => {
    const res = db.prepare(
        "INSERT INTO drug_class (name) " +
        `VALUES ('${name}')`
    ).run();

    console.log(`Added drug class (id: ${res.lastInsertRowid})`);
});

const dbEditDrugClass = db.transaction((id, name) => {
    const res = db.prepare(
        `UPDATE drug_class SET name = '${name}' ` +
        `WHERE id = ${id}`
    ).run();

    console.log(`Edited drug class (id: ${id})`);
});

const dbDeleteDrugClass = db.transaction((id) => {
    const res = db.prepare(
        "DELETE FROM drug_class " +
        `WHERE id = ${id}`
    ).run();

    console.log(`Deleted drug class (id: ${id})`);
});

module.exports = { dbGetDrugClasses, dbCreateDrugClass, dbEditDrugClass, dbDeleteDrugClass };
