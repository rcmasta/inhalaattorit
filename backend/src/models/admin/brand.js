const db = require('../../config/db');

class brand {

    static get = () => {
        const rows = db.prepare("SELECT id, name FROM inhaler_brand").all();
        return rows;
    };

    static create = (name) => {
        const res = db.prepare("INSERT INTO inhaler_brand (name) VALUES (@name)")
                      .run({name});

        const id = res.lastInsertRowid;
        console.log("Brand added (ID: ", id, ")");
        return id;
    };

    static edit = (id, name) => {
        const res = db.prepare("UPDATE inhaler_brand SET name = @name WHERE id = @id")
                      .run({name, id});

        console.log("Brand edited (ID: ", id, ")");
    };

    static delete = (id) => {
        const res = db.prepare("DELETE FROM inhaler_brand WHERE id = @id")
                      .run({id});

        console.log("Brand removed (ID: ", id, ")");
    };
};

module.exports = brand;