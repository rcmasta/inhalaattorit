const db = require('../db');
const { insert_test_med } = require('./insert_test_medicines'); 

insert_test_med(db);

console.log("Manual test data inserted");