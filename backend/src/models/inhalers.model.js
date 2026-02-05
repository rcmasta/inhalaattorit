const db = require('../config/db');

const getAllInhalers = () => {
    try {
        const query = 'SELECT * FROM medicine';
        const results = db.prepare(query).all();
        return results;

    } catch (err) {
        throw err;
    }
};

module.exports = { getAllInhalers };