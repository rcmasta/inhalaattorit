const { dbAdd, dbEdit, dbRemove } = require("../../models/admin/adminModel");
const { createActiveIngredient, editActiveIngredient, deleteActiveIngredient } = require('./activeIngredient');
const BackendError = require('../../classes/backendError');

const createItem = (req, res, next) => {
    // when creating medicine it must have a name
    if ( !req.body.name ) {
        throw new BackendError(400, 'Error! Missing medicine name!');
    }

    dbAdd(req.body);

    res.status(201).json({message: 'Item created successfully'});
};

const editItem = (req, res, next) => {
    if ( !req.body || Object.keys(req.body).length === 0){
        throw new BackendError(400, 'Error! Nothing to update!');
    }

    // if name is given it can't be null/empty
    if ( "name" in req.body && (!req.body.name || req.body.name.trim() === "") ) {
        throw new BackendError(400, 'Error! Medicine must have a name!');
    }

    dbEdit(req.params.id, req.body)

    res.status(201).json({message: 'Item edited successfully'});
};

const deleteItem = (req, res, next) => {
    const id = parseInt(req.params.id);
    dbRemove(id);

    res.status(200).json({message: 'Item removed successfully'});
};

module.exports = { createItem, editItem, deleteItem, createActiveIngredient, editActiveIngredient, deleteActiveIngredient };
