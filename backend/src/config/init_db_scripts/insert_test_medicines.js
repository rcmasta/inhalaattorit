const db = require('db');


const insert_med = db.prepare(`
    INSERT INTO medicine
        (name, image_path, description, legal_age, medicine_type, age_group_id,
        inhalation_requirement_id, inhaler_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const insert_join_medicine_dosage = db.prepare(`
    INSERT OR IGNORE INTO medicine_dosage (medicine_id, dosage_id) VALUES (?,?)
`);

const insert_join_drug_form = db.prepare(`
    INSERT OR IGNORE INTO medicine_drug_form (medicine_id, drug_form_id) VALUES (?, ?)
`);

const insert_join_active_ingredient = db.prepare(`
    INSERT OR IGNORE INTO medicine_active_ingredient (medicine_id, active_ingredient_id) VALUES (?, ?)
`);

const insert_join_medicine_color = db.prepare(`
    INSERT OR IGNORE INTO medicine_color (medicine_id, color_id) VALUES (?, ?)    
`);

// Few test medicines to be inserted
const medicines = [
    {
        name: "Aerobec Autohaler",
        image_path: null,
        desciption: "Tämä on lääkettä :)",
        drug_form: ['suihke', "suihke sisäänhengityksen laukaisema"],
        legal_age: 5,
        age_group: "Lapsi >12",
        dosage: ["Kaksi kertaa päivässä"],
        inhalation_requirement: {
            need_good_speed: true,
            need_good_coordination: false
        },
        inhaler: "Autohaler",
        color: ["Punainen"],
        drug_purpose: ['Hoitava lääke'],
        active_ingredients: ['Beklometasoni']
    }
]