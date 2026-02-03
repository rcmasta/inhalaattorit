const Inhalers = require('../models/inhalers.model');

class InhalersService {

    getAllInhalers() {
        return Inhalers.all();
    }
}

module.exports = new InhalersService();