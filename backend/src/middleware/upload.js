const multer = require("multer");
const path = require("path");
const { randomUUID } = require("crypto");

// saves user given image as tmp file to disk
const storage = multer.diskStorage({
    // destination is in data/tmp/
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../data/tmp"));
    },
    // unique name even if 2 uploads at the same time with same name
    filename: (req, file, cb) => {
        cb(null, randomUUID() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload;