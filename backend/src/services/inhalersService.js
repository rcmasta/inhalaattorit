const inhalersModel = require('../models/inhalers.model');
// This services file might be unessesary since it only has one purpose
class InhalersService {

    static getAllInhalers() {
        return inhalersModel.getAllInhalers();
    }
}

module.exports = InhalersService;