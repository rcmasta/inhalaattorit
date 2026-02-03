const Inhalers = require('../models/inhalers.model');

class InhalersService {

    static getAllInhalers() {
        return Inhalers.all();
    }
}

module.exports = InhalersService;