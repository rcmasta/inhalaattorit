const InhalersService = require('../services/inhalersService');


class InhalersController {

    static getInhalers(req, res) {
        try {
            let lang = req.query.lang;
            if (lang !== "fi" && lang !== "sv" ) {
                lang = "fi";
            }
            const data = InhalersService.getAllInhalers(lang);
            res.json(data);
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }
}

module.exports = InhalersController;