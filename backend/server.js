const bootstrapApp = require('./src/bootstrap/index');

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await bootstrapApp();
        const app = require('./app');

        app.listen(PORT, "0.0.0.0", () => {
            console.log('Application started successfully');
            console.log(`Server running on port ${PORT}`);
        });
    } catch(err) {
        console.log("Server startup failed: ", err);
        process.exit(1);
    }
};

start();
