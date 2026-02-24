const { dbAdd, dbEdit, dbRemove } = require("../../src/models/admin.model")

const createItem = (req, res, next) => {
    try {

        // when creating medicine it must have a name
        if ( !req.body.name ) {
            return res.status(400).json({
                success: false, 
                message: 'Error! Missing medicine name'});
        }

        dbAdd(req.body);

        res.status(201).json({
            success: true,
            message: 'Item created successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error!'
        });
    }
};

const editItem = (req, res, next) => {
    try {
        if ( !req.body || Object.keys(req.body).length === 0){
            return res.status(400).json({
                success: false, 
                message: 'Error! Nothing to update!'});
        }

        // if name is given it can't be null/empty
        if ( "name" in req.body && (!req.body.name || req.body.name.trim() === "") ) {
            return res.status(400).json({
                success: false,
                message: 'Error! Medicine must have a name!'
            });
        }

        dbEdit(req.params.id, req.body)

        res.status(201).json({
            success: true,
            message: 'Item edited successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error!'
        });
    }
};

const deleteItem = (req, res, next) => {

    try {
        const id = parseInt(req.params.id);
        dbRemove(id);

        res.status(200).json({
            success: true,
            message: 'Item removed successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Error!'
        });
    }

};

module.exports = { createItem, editItem, deleteItem };
