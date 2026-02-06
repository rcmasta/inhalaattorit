const db = require('db');


const insert_med = db.prepare(`
    INSERT INTO medicine
        (name, image_path, description, age_group_id, dosage_id, inhalation_requirement_id,
        inhaler_id, color_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const insert_join_drug_form = db.prepare(`
    INSERT OR IGNORE INTO medicine_drug_form (medicine_id, drug_form_id) VALUE (?, ?)
`);

const insert_join_drug_purpose = db.preprare(`
    INSERT OR IGNORE INTO medicine_drug_purpose (medicine_id, drug_purpose_id) VALUE (?, ?)
`);

const insert_join_active_ingredient = db.prepare(`
    INSERT OR IGNORE INTO medicine_active_ingredient (medicine_id, active_ingredient_id) 
`);

// Few test medicines to be inserted
const medicines = [
    {
        name: "Aerobec Autohaler",
        image_path: null,
        desciption: "Tämä on lääkettä :)",

        age_group: ["Aikuinen", "Lapsi >12"],
        dosage: "Kaksi kertaa päivässä",
        inhalation_requirement: ["Sisäänhengitysnopeus hyvä (> 30l/min), hyvä koordinaatio", "Sisäänhengitysnopeus hyvä (> 30l/min), huono koordinaatio"],
        inhaler: "Autohaler",
        color: "Punainen",
        drug_form: ['suihke', "suihke sisäänhengityksen laukaisema"],
        drug_purpose: ['Hoitava lääke'],
        active_ingredients: ['Beklometasoni']
    }
]