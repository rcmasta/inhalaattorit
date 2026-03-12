const Database = require("../config/db"); 

const getAllInhalers = (lang, db = Database) => {
    try {
        const query = 'SELECT m.* FROM medicine m';
        const medicines = db.prepare(query).all();

        medicines.forEach(med => {

            const row = db.prepare(`
                SELECT mt.description
                FROM medicine_translation mt
                WHERE mt.medicine_id = ? AND mt.language = ?
            `).get(med.id, lang);
            
            // description descrpition --> description
            med.description = row?.description ?? null;

            med.inhaler_brand = db.prepare(`
                SELECT ib.id, ib.name
                FROM inhaler_brand ib
                WHERE ib.id = ?
            `).get(med.inhaler_brand_id);

            delete med.inhaler_brand_id; // Remove duplicate brand_id

            med.intake_styles = db.prepare(`
                SELECT ist.intake_style_id, ist.name
                FROM intake_style_translation ist
                JOIN intake_style i_s ON ist.intake_style_id = i_s.id
                JOIN medicine_intake_style mis ON i_s.id = mis.intake_style_id
                WHERE mis.medicine_id = ? AND ist.language = ?
            `).all(med.id, lang);


            med.active_ingredients = db.prepare(`
                SELECT ait.active_ingredient_id, ait.name, dc.id as drug_class_id, dc.name as drug_class_name
                FROM active_ingredient_translation ait
                JOIN active_ingredient ai ON ait.active_ingredient_id = ai.id
                JOIN drug_class dc ON ai.drug_class_id = dc.id
                JOIN medicine_active_ingredient mai ON ai.id = mai.active_ingredient_id
                WHERE mai.medicine_id = ? AND ait.language = ?
            `).all(med.id, lang);

            med.colors = db.prepare(`
                SELECT ct.color_id, ct.name
                FROM color_translation ct
                JOIN color c ON ct.color_id = c.id
                JOIN medicine_color mc ON c.id = mc.color_id
                WHERE mc.medicine_id = ? AND ct.language = ?
            `).all(med.id, lang);
            
            med.links = med.links ? JSON.parse(med.links) : null;
        });
        
        return medicines;

    } catch (err) {
        throw err;
    }
};

module.exports = { getAllInhalers };