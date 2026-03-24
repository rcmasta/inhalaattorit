const adminModel = require('../../models/admin/adminModel');
const BackendError = require('../../classes/backendError');

function checkBody(body) {
    if (!body.fi || !body.sv) {
        throw new BackendError(400, 'Error! Active ingredient must have a name in both Finnish and Swedish!');
    }
    if (!body.drug_class_id) {
        throw new BackendError(400, 'Error! Active ingredient must have a drug class!');
    }
}

class activeIngredient {
    static get = (req, res, next) => {
        const data = adminModel.activeIngredient.get();

        res.status(200).json(data);
    };

    static create = (req, res, next) => {
        checkBody(req.body);

        const {fi, sv} = req.body;

        const drug_class_id = parseInt(req.body.drug_class_id);
        
        const id = adminModel.activeIngredient.create(fi, sv, drug_class_id);

        res.status(201).json({id, message: 'Active ingredient created successfully.'});
    };

    static edit = (req, res, next) => {
        checkBody(req.body);

        const id = req.params.id;
        const {fi, sv} = req.body;
        const drug_class_id = parseInt(req.body.drug_class_id);

        adminModel.activeIngredient.edit(id, fi, sv, drug_class_id);

        res.status(200).json({message: 'Active ingredient edited successfully'});  
    };

    static delete = (req, res, next) => {
        const id = req.params.id;

        adminModel.activeIngredient.delete(id);

        res.status(200).json({message: `Active ingredient deleted successfully`});
    };

};
module.exports = activeIngredient;
