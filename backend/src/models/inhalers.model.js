const db = require('../config/db');

const getAllInhalers = () => {
    try {
        const query = 'SELECT m.* FROM medicine m';
        const medicines = db.prepare(query).all();

        medicines.forEach(med => {
            med.inhaler_brand = db.prepare(`
                SELECT ib.id, ib.name
                FROM inhaler_brand ib
                WHERE ib.id = ?
            `).get(med.inhaler_brand_id);

            delete med.inhaler_brand_id; // Remove duplicate brand_id

            med.intake_styles = db.prepare(`
                SELECT i_s.id, i_s.name
                FROM intake_style i_s
                JOIN medicine_intake_style m_i_s ON i_s.id = m_i_s.intake_style_id
                where m_i_s.medicine_id = ?
            `).all(med.id);

            med.active_ingredients = db.prepare(`
                SELECT ai.id, ai.name
                FROM active_ingredient ai
                JOIN medicine_active_ingredient mai ON ai.id = mai.active_ingredient_id
                JOIN drug_class dc ON ai.drug_class_id = dc.id
                WHERE mai.medicine_id = ?
            `).all(med.id);

            med.colors = db.prepare(`
                SELECT c.id, c.name 
                FROM color c
                JOIN medicine_color mc ON c.id = mc.color_id
                WHERE mc.medicine_id = ?
            `).all(med.id);

        });
        return medicines;

    } catch (err) {
        throw err;
    }
};

module.exports = { getAllInhalers };