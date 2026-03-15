const { dbGetDrugClasses, dbCreateDrugClass, dbEditDrugClass, dbDeleteDrugClass } = require('../../models/admin/drugClass.js');
const BackendError = require('../../classes/backendError');

const getDrugClasses = (req, res, next) => {
    const drugClasses = dbGetDrugClasses();

    res.status(200).json(drugClasses);
}

const createDrugClass = (req, res, next) => {
    if (!req.body.name) {
        throw new BackendError(400, 'Drug class must have a name!');
    }

    dbCreateDrugClass(req.body.name);

    res.status(201).json({message: 'Created drug class successfully.'});
}

const editDrugClass = (req, res, next) => {
    if (!req.body.name) {
        throw new BackendError(400, 'Drug class must have a name!');
    }

    const id = parseInt(req.params.id);
    const name = req.body.name;

    dbEditDrugClass(id, name);

    res.status(201).json({message: 'Edited drug class successfully.'});
}

const deleteDrugClass = (req, res, next) => {
    const id = parseInt(req.params.id);

    dbDeleteDrugClass(id);

    res.status(200).json({message: 'Deleted drug class successfully.'});
}

module.exports = { getDrugClasses, createDrugClass, editDrugClass, deleteDrugClass };
