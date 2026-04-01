const adminModel = require('../../models/admin/adminModel');
const db = require('../../config/db');
const path = require('path');
const fs = require('fs/promises');
const { fork } = require("child_process");

const UPLOADS_FOLDER = path.join(__dirname, '../../../data/uploads');

class uploads {
    static add = async (req, res) => {
        try {
            const itemId = req.params.id;
            if (!itemId) { return res.status(400).json({message: "ID parameter missing"}); }

            const row = db.prepare("SELECT id FROM medicine WHERE id = ?").get(itemId);
            if (!row) { return res.status(404).json({message: "Can't find medicine with given ID"}) }

            const file = req.file;
            if (!file) { return res.status(400).json({message: "Image not given"}); }

            // worker for managing image compression and resolution
            fork(
                path.join(__dirname, "../../workers/imageWorker.js"),
                [req.file.path, itemId, UPLOADS_FOLDER]
            );

            res.status(201).json({message: 'Image added successfully'});
        } catch (err) {
            console.log(err);
            res.status(400).json({message: 'Image was not added'});
        }
    };

    static delete = async (req, res) => {

        const itemId = req.params.id;
        if (!itemId) { return res.status(400).json({message: "ID parameter missing"}); }

        if (await this.deleteWithId(itemId)) {
            res.status(200).json({message: 'Image removed successfully'});
        } else {
            res.status(404).json({message: "Image not found"});
        }
    };

    static deleteWithId = async (id) => {
        try { 
            await fs.unlink(path.join(UPLOADS_FOLDER, "full", id + ".jpeg")); 
            await fs.unlink(path.join(UPLOADS_FOLDER, "thumb", id + ".jpeg"));
        } catch {
            return false;
        }
        return true;
    };
};

module.exports = uploads;