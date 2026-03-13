const db = require('../../config/db');

const dbAddActiveIngredient = db.transaction((name_fi, name_sv, drug_class_id) => {
    const stmtNewActive = db.prepare(
        "INSERT INTO active_ingredient (drug_class_id) " +
        `VALUES (${drug_class_id})`
    );

    // run stmtNewActive and get the id of the new active ingredient
    const active_ingredient_id = stmtNewActive.run({drug_class_id}).lastInsertRowid;

    const stmtActiveTranslations = db.prepare(
        "INSERT INTO active_ingredient_translation (active_ingredient_id, language, name) VALUES" +
        `(${active_ingredient_id}, 'fi', '${name_fi}'),` +
        `(${active_ingredient_id}, 'sv', '${name_sv}')`
    );

    stmtActiveTranslations.run({name_fi, name_sv, drug_class_id});

    console.log(`Added active ingredient (id: ${active_ingredient_id})`);
});

module.exports = { dbAddActiveIngredient };
