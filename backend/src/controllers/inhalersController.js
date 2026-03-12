const inhalersModel = require('../models/inhalers.model');


class InhalersController {

    static getInhalers(req, res) {
        let lang = req.query.lang;
        if (lang !== "fi" && lang !== "sv" ) {
            lang = "fi";
        }
      
        const data = InhalersService.getAllInhalers(lang);
        res.json(data);
    }
}

module.exports = InhalersController;
