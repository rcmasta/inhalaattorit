const adminModel = require('../../models/admin/adminModel');
const BackendError = require('../../classes/backendError');
const db = require('../../config/db');

class inhalers {
    static create = (req, res, next) => {
        // when creating medicine it must have a name
        if ( !req.body.name ) {
            throw new BackendError(400, 'Error! Missing medicine name!');
        }

        adminModel.inhalers.create(req.body);

        res.status(201).json({message: 'Item created successfully'});
    };

    static edit = (req, res, next) => {
        if ( !req.body || Object.keys(req.body).length === 0){
            throw new BackendError(400, 'Error! Nothing to update!');
        }

        // if name is given it can't be null/empty
        if ( "name" in req.body && (!req.body.name || req.body.name.trim() === "") ) {
            throw new BackendError(400, 'Error! Medicine must have a name!');
        }

        adminModel.inhalers.edit(req.params.id, req.body)

        res.status(201).json({message: 'Item edited successfully'});
    };

    static delete = (req, res, next) => {
        const id = parseInt(req.params.id);
        adminModel.inhalers.delete(id);

        res.status(200).json({message: 'Item removed successfully'});
    };

    static filters = (req, res, next) => {

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

module.exports = inhalers;
