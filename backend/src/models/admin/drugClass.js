const db = require('../../db/database');

class drugClass {
    static get = () => {
        const drugClasses = db.prepare(
            "SELECT * FROM drug_class"
        ).all();

        return drugClasses;
    };

    static create = db.transaction((name) => {
        const res = db.prepare(
            "INSERT INTO drug_class (name) " +
            "VALUES (?)"
        ).run(name);

        const drug_class_id = res.lastInsertRowid;

        console.log(`Added drug class (id: ${drug_class_id})`);
        return drug_class_id;
    });

    static edit = db.transaction((id, name) => {
        const res = db.prepare(
            "UPDATE drug_class SET name = ? " +
            "WHERE id = ?"
        ).run(name, id);

        console.log(`Edited drug class (id: ${id})`);
    });

    static delete = db.transaction((id) => {
        const res = db.prepare(
            "DELETE FROM drug_class " +
            "WHERE id = ?"
        ).run(id);

        console.log(`Deleted drug class (id: ${id})`);
    });

};

module.exports = drugClass;
