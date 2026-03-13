const { dbAddActiveIngredient, dbEditActiveIngredient, dbDeleteActiveIngredient } = require('../../models/admin/adminModel');
const BackendError = require('../../classes/backendError');

function checkBody(body) {
    if (!body.name_fi || !body.name_sv) {
        throw new BackendError(400, 'Error! Active ingredient must have a name in both Finnish and Swedish!');
    }
    if (!body.drug_class_id) {
        throw new BackendError(400, 'Error! Active ingredient must have a drug class!');
    }
}

const createActiveIngredient = (req, res, next) => {
    checkBody(req.body);

    const {name_fi, name_sv} = req.body;
    const drug_class_id = parseInt(req.body.drug_class_id);
    
    dbAddActiveIngredient(name_fi, name_sv, drug_class_id);

    res.status(201).json({message: 'Active ingredient created successfully.'});
};

const editActiveIngredient = (req, res, next) => {
    checkBody(req.body);

    const id = req.params.id;
    const {name_fi, name_sv} = req.body;
    const drug_class_id = parseInt(req.body.drug_class_id);

    dbEditActiveIngredient(id, name_fi, name_sv, drug_class_id);

    res.status(200).json({message: 'Active ingredient edited successfully'});  
};

const deleteActiveIngredient = (req, res, next) => {
    const id = req.params.id;

    dbDeleteActiveIngredient(id);

    res.status(200).json({message: `Active ingredient deleted successfully`});
}

module.exports = { createActiveIngredient, editActiveIngredient, deleteActiveIngredient };
