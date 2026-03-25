const adminModel = require('../../models/admin/adminModel');
const BackendError = require('../../classes/backendError');

class brand {
    static create = (req, res) => {
        // when creating medicine it must have a name
        if ( !req.body.name ) {
            throw new BackendError(400, 'Error! Missing medicine name!');
        }

        const id = adminModel.brand.create(req.body);

        res.status(201).json({id, message: 'Brand created successfully'});
    };

    static edit = (req, res) => {

        if ( !req.body || Object.keys(req.body).length === 0){
            throw new BackendError(400, 'Error! Nothing to update!');
        }

        // if name is given it can't be null/empty
        if ( "name" in req.body && (!req.body.name || req.body.name.trim() === "") ) {
            throw new BackendError(400, 'Error! Brand must have a name!');
        }

        adminModel.brand.edit(req.params.id, req.body)

        res.status(201).json({message: 'Brand edited successfully'});
    };

    static delete = (req, res) => {
        const id = parseInt(req.params.id);
        adminModel.brand.delete(id);

        res.status(200).json({id, message: 'Brand removed successfully'});
    };
};

module.exports = brand;