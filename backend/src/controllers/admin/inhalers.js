const adminModel = require('../../models/admin/adminModel');
const BackendError = require('../../classes/backendError');

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
};

module.exports = inhalers;
