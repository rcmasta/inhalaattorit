const db = require('../../config/db');

class brand {

    static get = () => {
        const rows = db.prepare("SELECT id, name FROM inhaler_brand").all();
        return rows;
    };

    static create = (name) => {
        // if name already in use
        if (exists(name)) { return {success: false}; }

        const res = db.prepare("INSERT INTO inhaler_brand (name) VALUES (@name)")
                      .run({name});

        const id = res.lastInsertRowid;
        console.log("Brand added (ID: ", id, ")");
        return {success: true, id};
    };

    static edit = (id, name) => {
        if (exists(name)) { return {success: false, error: "NAME_TAKEN"}; }

        const res = db.prepare("UPDATE inhaler_brand SET name = @name WHERE id = @id")
                      .run({name, id});

        // if nothing was edited (id is not in inhaler_brand)
        if (res.changes === 0) { return { success: false, error: "ID_MISSING"}; }

        console.log("Brand edited (ID: ", id, ")");
        return {success: true};
    };

    static delete = (id) => {
        const res = db.prepare("DELETE FROM inhaler_brand WHERE id = @id")
                      .run({id});

        if (res.changes === 0) { return false; }

        console.log("Brand removed (ID: ", id, ")");
        return true;
    };
};

const exists = (name) => {
    return db.prepare("SELECT 1 FROM inhaler_brand WHERE name = @name LIMIT 1")
             .get({name});
};

module.exports = brand;