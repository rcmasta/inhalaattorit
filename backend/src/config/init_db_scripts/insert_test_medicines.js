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
const test_medicines = [
    {
        name: "Aerobec Autohaler",
        image_path: null,
        desciption: "Tämä on lääkettä :)",
        legal_age: 5,
        medicine_type: 'Hoitava',

        drug_form_id: [3, 4],
        age_group_id: 3,
        dosage_id: [2],
        inhalation_requirement_id: 2,
        inhaler_id: 10,
        active_ingredients_id: [1],
        color_id: [3]
    },
    {
        name: "Alvesco",
        image_path: null,
        desciption: "Tällä lääkkellä ei ole merkki inhalaattoria :(",
        legal_age: 12,
        medicine_type: 'Hoitava',

        drug_form_id: [3],
        age_group_id: 4,
        dosage_id: [1],
        inhalation_requirement_id: 3,
        inhaler_id: null,
        active_ingredients_id: [6],
        color_id: [3]
    },
    {
        name: "Symbicort Turbuhaler",
        image_path: null,
        desciption: "Hoitava- ja oirelääke",
        legal_age: 6,
        medicine_type: 'Molemmat',

        drug_form_id: [1],
        age_group_id: 2,
        dosage_id: [2],
        inhalation_requirement_id: 2,
        inhaler_id: 3,
        active_ingredients_id: [2, 7],
        color_id: [1, 3]
    }
];

const db_add_test = (meds) => {
    meds.forEach(med => {
        const { name, image_path, desciption, legal_age, medicine_type} = med; // Basic info, straight into medicine
        const { drug_form_id, age_group_id, dosage_id, inhalation_requirement_id, inhaler_id, active_ingredients_id, color_id } = med; // different tables


        
        const result = insert_med.run(name, image_path, desciption, legal_age, medicine_type)        
    });
};