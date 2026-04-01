const sharp = require('sharp')
const path = require('path')

const MAX_FULL_RES = 2160; // limits full size res 
const MAX_THUMB_RES = 500; // limits thumbnail res

(async () => {
    const filePath = process.argv[2];
    const itemId = process.argv[3];
    const uploadsFolder = process.argv[4];

    const image = sharp(filePath);
    const metadata = await image.metadata();

    const fullSize = Math.min(metadata.width, metadata.height, MAX_FULL_RES);
    const thumbSize = Math.min(fullSize, MAX_THUMB_RES);

    // full size picture
    await image
        .resize({ width: fullSize, height: fullSize })
        .jpeg({quality: 90})
        .toFile(path.join(uploadsFolder, "full", itemId + ".jpeg"));

    // thumbnail picture
    await image
        .resize({ width: thumbSize, height: thumbSize})
        .jpeg({quality: 50})
        .toFile(path.join(uploadsFolder, "thumb", itemId + ".jpeg"));

    // remove original tmp picture
    fs.unlink(filePath);

    process.exit(0);
})();