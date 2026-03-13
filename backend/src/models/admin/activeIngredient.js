const db = require('../../config/db');

const stmtEditTL = (id, language, name) => {
    return db.prepare(
        `UPDATE active_ingredient_translation SET name = '${name}' ` +
        `WHERE active_ingredient_id = ${id} AND language = '${language}'`
    );
};

const dbAddActiveIngredient = db.transaction((name_fi, name_sv, drug_class_id) => {
    const stmtNewActive = db.prepare(
        "INSERT INTO active_ingredient (drug_class_id) " +
        `VALUES (${drug_class_id})`
    );

    // run stmtNewActive and get the id of the new active ingredient
    const active_ingredient_id = stmtNewActive.run().lastInsertRowid;

    const stmtActiveTranslations = db.prepare(
        "INSERT INTO active_ingredient_translation (active_ingredient_id, language, name) VALUES" +
        `(${active_ingredient_id}, 'fi', '${name_fi}'),` +
        `(${active_ingredient_id}, 'sv', '${name_sv}')`
    );
    stmtActiveTranslations.run();

    console.log(`Added active ingredient (id: ${active_ingredient_id})`);
});

const dbEditActiveIngredient = db.transaction((id, name_fi, name_sv, drug_class_id) => {
    const stmtEditActive = db.prepare(
        `UPDATE active_ingredient SET drug_class_id = ${drug_class_id} ` +
        `WHERE id = ${id}`
    );

    // update the drug class id of the active ingredient
    const resEditActive = stmtEditActive.run();

    // update the names of the active ingredient 
    const resEditFi = stmtEditTL(id, 'fi', name_fi).run();
    const resEditSv = stmtEditTL(id, 'sv', name_sv).run();

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

module.exports = { dbAddActiveIngredient, dbEditActiveIngredient, dbDeleteActiveIngredient };
