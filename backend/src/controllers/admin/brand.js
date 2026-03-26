const adminModel = require('../../models/admin/adminModel');
const BackendError = require('../../classes/backendError');

class brand {

    static get = (req, res) => {
        const brands = adminModel.brand.get();
        res.status(200).json(brands);
    };

    static create = (req, res) => {
        if ( !req.body.name ) {
            throw new BackendError(400, 'Error! Missing brand name!');
        }

        const result = adminModel.brand.create(req.body.name);
        if (!result.success) { throw new BackendError(409, 'Brand name already in use!'); }

        res.status(201).json({id: result.id, message: 'Brand created successfully'});
    };

    static edit = (req, res) => {   
        if ( !req.body || Object.keys(req.body).length === 0){
            return res.status(400).json({message: 'Nothing to update!'});
        }

        // if name is given it can't be null/empty
        if ( "name" in req.body && (!req.body.name || req.body.name.trim() === "") ) {
            throw new BackendError(400, 'Missing brand name!');
        }

        const result = adminModel.brand.edit(req.params.id, req.body.name)

        if (!result.success) {
            switch (result.error) {
                case "NAME_TAKEN": throw new BackendError(409, 'Brand name already in use!');
                case "ID_MISSING": throw new BackendError(404, 'Non valid brand ID!');
            }
            throw new BackendError(400, 'Brand was not edited! Something went wrond.')
        }

        res.status(200).json({message: 'Brand edited successfully'});
    };

    static delete = (req, res) => {
        const id = parseInt(req.params.id);
        const result = adminModel.brand.delete(id);

        if (!result) { throw new BackendError(404, 'Non valid brand ID!'); }
        res.status(200).json({message: 'Brand removed successfully'});
    };
};

module.exports = brand;