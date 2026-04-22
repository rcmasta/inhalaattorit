const inhalersModel = require('../models/inhalersModel');

// list of supported languages
const supportedLanguages = ["fi", "sv"];

class InhalersController {

    static getInhalers(req, res) {
        try {
            const lang = getLanguage(req.query.lang);
            const data = inhalersModel.getAllInhalers(lang);

            res.json(data);
            
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    };

    static getFilters = (req, res) => {
        try {
            const lang = getLanguage(req.query.lang);
            const data = inhalersModel.getUsedFilters(lang);

            res.json(data);

        } catch (e) {
            res.status(500).json({message: e.message});
        }
    };
}

const getLanguage = (lang) => {
    // if language isn't supported default to finnish
    if (!supportedLanguages.includes(lang)) {
        return "fi";
    }
    return lang;
}

module.exports = InhalersController;
