const db = require('../../config/db');

const stmtEditTL = db.prepare(
    "UPDATE active_ingredient_translation SET name = ? " +
    "WHERE active_ingredient_id = ? AND language = ?"
);

class activeIngredient {
    static get = () => {
        const query = db.prepare(
            "SELECT a.id, a.drug_class_id, tl.language, tl.name " +
            "FROM active_ingredient AS a " + 
            "LEFT JOIN active_ingredient_translation AS tl " +
            "ON a.id = tl.active_ingredient_id"
        ).all();

        // join the queried data such that each active ingredient has only one row
        let activeIngredients = {};
        query.forEach(row => {
            if (!activeIngredients[row.id]) {
                activeIngredients[row.id] = {id: row.id, drug_class_id: row.drug_class_id};
            }
            activeIngredients[row.id][row.language] = row.name;
        }); 

        // get rid of the excess id keys as activeIngredients is of format "id"; {data}.
        // there's gotta be a better way to do the whole operation but at least this works lol
        let data = [];
        Object.entries(activeIngredients).forEach( a => {
            data.push(a[1]);
        });

        return data;
    };

    static create = db.transaction((fi, sv, drug_class_id) => {
        const stmtNewActive = db.prepare(
            "INSERT INTO active_ingredient (drug_class_id) " +
            "VALUES (?)"
        );

        // run stmtNewActive and get the id of the new active ingredient
        const active_ingredient_id = stmtNewActive.run(drug_class_id).lastInsertRowid;

        const stmtActiveTL = db.prepare(
            "INSERT INTO active_ingredient_translation (active_ingredient_id, language, name) " + 
            "VALUES (?, ?, ?)"
        );
        stmtActiveTL.run(active_ingredient_id, 'fi', fi);
        stmtActiveTL.run(active_ingredient_id, 'sv', sv);

        console.log(`Added active ingredient (id: ${active_ingredient_id})`);
        return active_ingredient_id; 
    });

    static edit = db.transaction((id, fi, sv, drug_class_id) => {
        const stmtEditActive = db.prepare(
            "UPDATE active_ingredient SET drug_class_id = ? " +
            "WHERE id = ?"
        );

        // update the drug class id of the active ingredient
        const resEditActive = stmtEditActive.run(drug_class_id, id);

        // update the names of the active ingredient 
        const resEditFi = stmtEditTL.run(fi, id, 'fi');
        const resEditSv = stmtEditTL.run(sv, id, 'sv');

        console.log(`Edited active ingredient (id: ${id})`);
    });

    static delete = db.transaction((id) => {
        const stmtDeleteActive = db.prepare(
            "DELETE FROM active_ingredient " +
            "WHERE id = ?"
        );

        const res = stmtDeleteActive.run(id);

        console.log(`Deleted active ingredient (id: ${id})`);
    });

}; 

module.exports = activeIngredient;
