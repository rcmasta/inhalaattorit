const app = require('./app');
const initFileSystem = require('./src/services/fileSystemService');
require("./src/jobs/schedule");

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    initFileSystem();
    console.log(`Server running on port ${PORT}`);
});