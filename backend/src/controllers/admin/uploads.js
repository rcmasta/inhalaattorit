const adminModel = require('../../models/admin/adminModel');
const db = require('../../config/db');
const sharp = require('sharp')
const path = require('path')
const fs = require('fs/promises')

const MAX_FULL_RES = 2160; // limits full size res 
const MAX_THUMB_RES = 500; // limits thumbnail res

class uploads {
    static add = async (req, res) => {
        try {
            const itemId = req.params.id;
            if (!itemId) { return res.status(400).json({message: "ID parameter missing"}); }

            const row = db.prepare("SELECT id FROM medicine WHERE id = ?").get(itemId);
            if (!row) { return res.status(404).json({message: "Can't find medicine with given ID"}) }

            const file = req.file;
            if (!file) { return res.status(400).json({message: "Image not given"}); }

            const metadata = await sharp(file.buffer).metadata();

            const fullSize = Math.min(metadata.width, metadata.height, MAX_FULL_RES);
            const thumbSize = Math.min(fullSize, MAX_THUMB_RES);

            const fullResFolder = path.join(__dirname, '../../../uploads/full');
            const thumbResFolder = path.join(__dirname, '../../../uploads/thumb');

            // creates if missing folders
            await fs.mkdir(fullResFolder, { recursive: true });
            await fs.mkdir(thumbResFolder, { recursive: true });

            // full size picture
            await sharp(file.buffer)
                .resize({ width: fullSize, height: fullSize })
                .jpeg({quality: 90})
                .toFile(path.join(fullResFolder, itemId + ".jpeg"));

            // thumbnail picture
            await sharp(file.buffer)
                .resize({ width: thumbSize, height: thumbSize})
                .jpeg({quality: 50})
                .toFile(path.join(thumbResFolder, itemId + ".jpeg"));
     
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
        const fullResImage = path.join(__dirname, '../../../uploads/full/' + id + ".jpeg");
        const thumbResImage = path.join(__dirname, '../../../uploads/thumb/' + id + ".jpeg");

        try { 
            await fs.unlink(fullResImage); 
            await fs.unlink(thumbResImage);
        } catch {
            return false;
        }
        return true;
    };
};

module.exports = uploads;