const { dbAddActiveIngredient } = require('../../models/admin/adminModel');
const BackendError = require('../../classes/backendError');

const createActiveIngredient = (req, res, next) => {
    const {name_fi, name_sv} = req.body;
    const drug_class_id = parseInt(req.body.drug_class_id);
    
    if (!name_fi || !name_sv) {
        throw new BackendError(400, 'Error! Active ingredient must have a name in both Finnish and Swedish!');
    }
    if (!drug_class_id) {
        throw new BackendError(400, 'Error! Active ingredient must have a drug class!');
    }

    dbAddActiveIngredient(name_fi, name_sv, drug_class_id);

    res.status(201).json({message: 'Active ingredient created successfully.'})
};

module.exports = { createActiveIngredient };
