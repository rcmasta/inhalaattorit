const BackendError = require('../../classes/backendError');
const db = require('../../db/database');

class filters {

    static get = (req, res, next) => {
    try {
        const intakeMap = getAllLangFromDB("intake_style");
        const ingredientsMap = getAllLangFromDB("active_ingredient");
        const colorsMap = getAllLangFromDB("color");
        const brandMap = Object.fromEntries(db.prepare(`SELECT id, name FROM inhaler_brand`).all()
                        .map(r => [r.id, {id: r.id, name: r.name}]));

        res.status(200).json({ 
            active_ingredients: Object.values(ingredientsMap),
            colors: Object.values(colorsMap),
            intake_styles: Object.values(intakeMap),
            inhaler_brands: Object.values(brandMap) 
        });
    } catch (err) { 
        throw new BackendError(500, "An unexpected error occurred while fetching filters.");
    }
    };
};

const allowedValues = ["intake_style", "active_ingredient", "color"];
const getAllLangFromDB = (search) => {

    if (!allowedValues.includes(search)){
        return {};
    }

    const rows = db.prepare(
        `SELECT main.id, lang.language, lang.name
         FROM ${search} AS main
         LEFT JOIN ${search}_translation AS lang
         ON main.id = lang.${search}_id`).all();

    const res = {};
    rows.forEach(r => {
        if (!res[r.id]) { res[r.id] = { id: r.id, name: {} }; }
        if (r.language) { res[r.id].name[r.language] = r.name; }
    });

    return res;
};

module.exports = filters;