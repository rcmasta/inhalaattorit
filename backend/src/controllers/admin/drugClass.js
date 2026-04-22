const adminModel = require('../../models/admin/adminModel');
const BackendError = require('../../classes/backendError');

class drugClass {
    static get = (req, res, next) => {
        const drugClasses = adminModel.drugClass.get();

        res.status(200).json(drugClasses);
    };

    static create = (req, res, next) => {
        if (!req.body.name) {
            throw new BackendError(400, 'Drug class must have a name!');
        }

        const id = adminModel.drugClass.create(req.body.name);

        res.status(201).json({id, message: 'Created drug class successfully.'});
    };

    static edit = (req, res, next) => {
        if (!req.body.name) {
            throw new BackendError(400, 'Drug class must have a name!');
        }

        const id = parseInt(req.params.id);
        const name = req.body.name;

        adminModel.drugClass.edit(id, name);

        res.status(201).json({message: 'Edited drug class successfully.'});
    };

    static delete = (req, res, next) => {
        const id = parseInt(req.params.id);

        adminModel.drugClass.delete(id);

        res.status(200).json({message: 'Deleted drug class successfully.'});
    };

};

module.exports = drugClass;
