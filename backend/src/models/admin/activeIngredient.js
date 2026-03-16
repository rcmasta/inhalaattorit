const db = require('../../config/db');
const sanitizeName = require('../../utils/sanitizeName');

const stmtEditTL = (id, language, name) => {
    return db.prepare(
        `UPDATE active_ingredient_translation SET name = '${name}' ` +
        `WHERE active_ingredient_id = ${id} AND language = '${language}'`
    );
};

const dbGetActiveIngredients = () => {
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

const dbAddActiveIngredient = db.transaction((fi, sv, drug_class_id) => {
    fi = sanitizeName(fi);
    sv = sanitizeName(sv);

    const stmtNewActive = db.prepare(
        "INSERT INTO active_ingredient (drug_class_id) " +
        `VALUES (${drug_class_id})`
    );

    // run stmtNewActive and get the id of the new active ingredient
    const active_ingredient_id = stmtNewActive.run().lastInsertRowid;

    const stmtActiveTranslations = db.prepare(
        "INSERT INTO active_ingredient_translation (active_ingredient_id, language, name) VALUES" +
        `(${active_ingredient_id}, 'fi', '${fi}'),` +
        `(${active_ingredient_id}, 'sv', '${sv}')`
    );
    stmtActiveTranslations.run();

    console.log(`Added active ingredient (id: ${active_ingredient_id})`);
});

const dbEditActiveIngredient = db.transaction((id, fi, sv, drug_class_id) => {
    fi = sanitizeName(fi);
    sv = sanitizeName(sv);

    const stmtEditActive = db.prepare(
        `UPDATE active_ingredient SET drug_class_id = ${drug_class_id} ` +
        `WHERE id = ${id}`
    );

    // update the drug class id of the active ingredient
    const resEditActive = stmtEditActive.run();

    // update the names of the active ingredient 
    const resEditFi = stmtEditTL(id, 'fi', fi).run();
    const resEditSv = stmtEditTL(id, 'sv', sv).run();

    console.log(`Edited active ingredient (id: ${id})`);
});

const dbDeleteActiveIngredient = db.transaction((id) => {
    const stmtDeleteActive = db.prepare(
        'DELETE FROM active_ingredient ' +
        `WHERE id = ${id}`
    );

    const res = stmtDeleteActive.run();

    console.log(`Deleted active ingredient (id: ${id})`);
});

module.exports = { dbGetActiveIngredients, dbAddActiveIngredient, dbEditActiveIngredient, dbDeleteActiveIngredient };
