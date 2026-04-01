const app = require('./app');
const initFolders = require('./src/services/fileSystemService');
require("./src/jobs/cleanTmp");

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    initFolders();
    console.log(`Server running on port ${PORT}`);
});