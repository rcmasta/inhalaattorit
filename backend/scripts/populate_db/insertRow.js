
const insertRow = (data, db) => {
    const stmtInsertMed = db.prepare(`
        INSERT INTO medicine
            (name, image_path, links, official_min_age, recommended_min_age, treatment_medicine, symptomatic_medicine,
            good_intake_speed, good_coordination, times_a_day, inhaler_brand_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const stmtInsertMedTL = db.prepare(`
        INSERT INTO medicine_translation (medicine_id, language, description)
        VALUES (?, ?, ?)
    `);

    const stmtInsertMedIntakeStyle = db.prepare(`
        INSERT OR IGNORE INTO medicine_intake_style (medicine_id, intake_style_id) VALUES (?,?)
    `);

    const stmtInsertMedActiveIngredient = db.prepare(`
        INSERT OR IGNORE INTO medicine_active_ingredient (medicine_id, active_ingredient_id) VALUES (?, ?)
    `);

    const stmtInsertMedColor = db.prepare(`
        INSERT OR IGNORE INTO medicine_color (medicine_id, color_id) VALUES (?, ?)    
    `);

    const res = stmtInsertMed.run(data.name, 
                                  null,
                                  JSON.stringify({'database': `${data.database_link}`, 'tutorial': `${data.tutorial_link}`}),
                                  data.official_min_age, 
                                  data.recommended_min_age, 
                                  data.treatment_medicine, 
                                  data.symptomatic_medicine, 
                                  data.good_intake_speed, 
                                  data.good_coordination, 
                                  data.times_a_day, 
                                  data.inhaler_brand_id
                                 );

    const medicine_id = res.lastInsertRowid;

    // insert empty descriptions for both finnish and swedish
    stmtInsertMedTL.run(medicine_id, 'fi', null);
    stmtInsertMedTL.run(medicine_id, 'sv', null);


    data.intake_style_ids.forEach(intake_style_id => {
        stmtInsertMedIntakeStyle.run(medicine_id, intake_style_id);
    });

    data.active_ingredient_ids.forEach(active_ingredient_id => {
        stmtInsertMedActiveIngredient.run(medicine_id, active_ingredient_id);
    });

    data.color_ids.forEach(color_id => {
        stmtInsertMedColor.run(medicine_id, color_id);
    });

} 

module.exports = insertRow;
