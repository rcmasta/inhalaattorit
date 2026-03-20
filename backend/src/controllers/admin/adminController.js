const inhalers = require("./inhalers");
const uploads = require("./uploads")
const activeIngredient = require('./activeIngredient');
const drugClass = require('./drugClass');

const BackendError = require('../../classes/backendError');

module.exports = { inhalers, uploads, activeIngredient, drugClass };
