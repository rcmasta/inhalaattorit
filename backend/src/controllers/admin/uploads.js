const adminModel = require('../../models/admin/adminModel');

const sharp = require('sharp')
const path = require('path')
const fs = require('fs/promises')

class uploads {
    static add = async (req, res) => {
        try {
            const itemId = req.params.id;
            const file = req.file;

            if (!file) {
                return res.status(400).json({message: "Image not given"});
            }

            const metadata = await sharp(file.buffer).metadata();

            let fullSize = metadata.width >= metadata.height ? metadata.height : metadata.width;
            const thumbSize = fullSize > 500 ? 500 : fullSize;
            if (fullSize > 2160) { fullSize = 2160; } // max size is standard 4K 

            const fullResFolder = path.join(__dirname, '../../../uploads/full');
            const thumbResFolder = path.join(__dirname, '../../../uploads/thumb');

            // creates missing folders
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
            res.status(400).json({message: 'Image was not added'});
        }
    };

    static delete = async (req, res) => {

        const itemId = req.params.id;
        const fullResImage = path.join(__dirname, '../../../uploads/full/' + itemId + ".jpeg");
        const thumbResImage = path.join(__dirname, '../../../uploads/thumb/' + itemId + ".jpeg");

        try { 
            await fs.unlink(fullResImage); 
            await fs.unlink(thumbResImage);
            res.status(200).json({message: 'Image removed successfully'});
        } catch {
            res.status(400).json({message: "Image not removed"});
        }
    };
};

module.exports = uploads;