const InhalersService = require('../services/inhalersService');


class InhalersController {

    static getInhalers(req, res) {
        try {
            const data = InhalersService.getAllInhalers();
            res.json(data);
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }
}

module.exports = InhalersController;