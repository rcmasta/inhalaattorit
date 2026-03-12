const inhalersModel = require('../models/inhalers.model');


class InhalersController {

    static getInhalers(req, res) {
        try {
            let lang = req.query.lang;
            if (lang !== "fi" && lang !== "sv" ) {
                lang = "fi";
            }
            
            const data = inhalersModel.getAllInhalers(lang);
            res.json(data);
            
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }
}

module.exports = InhalersController;