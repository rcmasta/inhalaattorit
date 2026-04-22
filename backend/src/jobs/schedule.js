const cron = require('node-cron');
const rotateJwt = require('./rotateJwt');
const cleanTmp = require('./cleanTmp');

const CLEANUP_TIME = "0 3 * * *"; // daily 03:00

cron.schedule(CLEANUP_TIME, async () => {
    console.log(`\n[${new Date().toLocaleString()}] \nScheduled jobs:`);
    await rotateJwt();
    await cleanTmp();
});