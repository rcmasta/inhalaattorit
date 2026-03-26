const adminModel = require('../../models/admin/adminModel');
const BackendError = require('../../classes/backendError');

class brand {

    static get = (req, res) => {
        try {
            const brands = adminModel.brand.get();
            res.status(200).json(brands);

        } catch (err) {
            throw new BackendError(500, "Internal server error!");
        }
    };

    static create = (req, res) => {

        try {
            if ( !req.body.name ) {
                throw new BackendError(400, 'Error! Missing medicine name!');
            }
            const id = adminModel.brand.create(req.body);
            res.status(201).json({id, message: 'Brand created successfully'});

        } catch (err) {
            throw new BackendError(500, "Internal server error!");
        }
    };

    static edit = (req, res) => {
        try {       
            if ( !req.body || Object.keys(req.body).length === 0){
                throw new BackendError(400, 'Error! Nothing to update!');
            }

            // if name is given it can't be null/empty
            if ( "name" in req.body && (!req.body.name || req.body.name.trim() === "") ) {
                throw new BackendError(400, 'Error! Brand must have a name!');
            }

            adminModel.brand.edit(req.params.id, req.body)
            res.status(201).json({message: 'Brand edited successfully'});

        } catch (err) {
            throw new BackendError(500, "Internal server error!");
        }

    };

    static delete = (req, res) => {
        try {
            const id = parseInt(req.params.id);
            adminModel.brand.delete(id);

            res.status(200).json({id, message: 'Brand removed successfully'});
        } catch (err) {
            throw new BackendError(500, "Internal server error!");
        }
    };
};

module.exports = brand;