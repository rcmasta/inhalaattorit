const serverInit = require('./src/init/serverInit');

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await serverInit();
        const app = require('./app');

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch(err) {
        console.log("Startup failed: ", err);
        process.exit(1);
    }
};

start();
