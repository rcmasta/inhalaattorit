
const insert_test_med = (db) => {
    const insert_med = db.prepare(`
        INSERT INTO medicine
            (name, image_path, links, official_min_age, recommended_min_age, treatment_medicine, symptomatic_medicine,
            good_intake_speed, good_coordination, times_a_day, inhaler_brand_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insert_med_translation = db.prepare(`
        INSERT INTO medicine_translation (medicine_id, language, description)
        VALUES (?, ?, ?)
    `);

    const insert_join_medicine_intake_style = db.prepare(`
        INSERT OR IGNORE INTO medicine_intake_style (medicine_id, intake_style_id) VALUES (?,?)
    `);

    const insert_join_active_ingredient = db.prepare(`
        INSERT OR IGNORE INTO medicine_active_ingredient (medicine_id, active_ingredient_id) VALUES (?, ?)
    `);

    const insert_join_medicine_color = db.prepare(`
        INSERT OR IGNORE INTO medicine_color (medicine_id, color_id) VALUES (?, ?)    
    `);

    // Few test medicines to be inserted
    const test_medicines = [
        {
            name: "Aerobec Autohaler",
            image_path: null,
            description: {
                fi: "Tämä on lääkettä",
                sv: "det här är medicin"
            },
            links: {
                database: "https://pharmacafennica.fi/nospc/53460393",
                tutorial: "https://www.youtube.com/watch?v=Dubi3HXWxzM&list=PLNhllJNrG-R__DjSxaxbltf635aJGmadl&index=2"
            },
            official_min_age: 5,
            recommended_min_age: 6,
            times_a_day: 2,
            good_intake_speed: 1,
            good_coordination: 1,
            treatment_medicine: 1,
            symptomatic_medicine: 0,

            inhaler_brand_id: 10,
            intake_style_id: [3, 4],
            active_ingredients_id: [1],
            color_id: [3]
        },
        {
            name: "Alvesco",
            image_path: null,
            description: {
                fi: "Tällä lääkkeellä ei ole inhalaattori merkkiä",
                sv: "Detta läkemedel har inget inhalatormärke."
            },
            links: {
                database: "https://pharmacafennica.fi/spc/2861725",
                tutorial: "https://www.youtube.com/watch?v=dr5umCHXg10&list=PLNhllJNrG-R__DjSxaxbltf635aJGmadl&index=6"
            },
            official_min_age: 12,
            recommended_min_age: 12,
            times_a_day: 1,
            good_intake_speed: 0,
            good_coordination: 1,
            treatment_medicine: 1,
            symptomatic_medicine: 0,

            inhaler_brand_id: null,
            intake_style_id: [3],
            active_ingredients_id: [6],
            color_id: [3]
        },
        {
            name: "Symbicort Turbuhaler",
            image_path: null,
            description: {
                fi: "hoitavalääke ja oirelääke",
                sv: "terapeutisk och symtomatisk medicin"
            },
            links: {
                database: "https://pharmacafennica.fi/spc/2011594",
                tutorial: "https://www.youtube.com/watch?v=kZ1UXkbvpqo&list=PLNhllJNrG-R__DjSxaxbltf635aJGmadl&index=28"
            },
            official_min_age: 6,
            recommended_min_age: 6,
            times_a_day: 2,
            good_intake_speed: 1,
            good_coordination: 1,
            treatment_medicine: 1,
            symptomatic_medicine: 1,

            inhaler_brand_id: 3,
            intake_style_id: [1],
            active_ingredients_id: [2, 7],
            color_id: [1, 3]
        }
    ];

    const db_add_test = (meds) => {
        meds.forEach(med => {
            const { name, image_path, links, official_min_age, recommended_min_age, 
                    treatment_medicine, symptomatic_medicine, good_intake_speed, good_coordination, 
                    times_a_day, inhaler_brand_id } = med; // Basic info, straight into medicine
            
            const { description } = med;
            
            const { intake_style_id, active_ingredients_id, color_id } = med; // many to many tables
                
            const result = insert_med.run(name, image_path, JSON.stringify(links), official_min_age, 
                recommended_min_age, treatment_medicine, symptomatic_medicine, good_intake_speed, 
                good_coordination, times_a_day, inhaler_brand_id);

            // Medicine id for other tables
            const med_id = result.lastInsertRowid;

            // Insert descriptions
            for (const [lang, text] of Object.entries(description)) {
                insert_med_translation.run(med_id, lang, text)
            }

            // Many to many ids
            intake_style_id.forEach(style_id => {
                insert_join_medicine_intake_style.run(med_id, style_id);
            });

            active_ingredients_id.forEach(ingredient_id => {
                insert_join_active_ingredient.run(med_id, ingredient_id);
            });

            color_id.forEach(cid => {
                insert_join_medicine_color.run(med_id, cid);
            });
        });
    };

    db_add_test(test_medicines);
}

module.exports = { insert_test_med };