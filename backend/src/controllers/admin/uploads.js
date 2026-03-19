const adminModel = require('../../models/admin/adminModel');
const BackendError = require('../../classes/backendError');
const dbInhalers = require ('../../models/admin/inhalers');

const sharp = require('sharp')
const path = require('path')

const fullResSize = 2048;
const thumbResSize = 512;

class uploads {
    static add = async (req, res) => {
        try {
            const itemId = req.params.id;
            const file = req.file;
            const filename = Date.now() - Math.random() + '.jpeg';

            const fullResPath = path.join('uploads', 'full', filename);
            const thumbResPath = path.join('uploads', 'thumb', filename);

            await sharp(file.buffer)
                .resize(fullResSize)
                .jpeg({quality: 90})
                .toFile(fullResPath);

            await sharp(file.buffer)
                .resize(thumbResSize)
                .jpeg({quality: 50})
                .toFile(thumbResPath);

            dbInhalers.edit(itemId, { image_path: filename });

            res.status(201).json({message: 'Image added successfully'});
        } catch (err) {
            res.status(400).json({message: 'Image was not added'});
        }
    };

    static delete = (req, res) => {
        const id = parseInt(req.params.id);
        const filename = "";
    };
};

module.exports = uploads;