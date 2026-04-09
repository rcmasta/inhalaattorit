const xlsx = require('xlsx');
const path = require("path");
const fs = require("fs");

const parseRow = require('./parseRow');
const insertRow = require('./insertRow');

const runPopulation = (db, filename) => {
    if (!filename) { return console.log("Error: Path to .xlsx file is required!"); }

    const workbook = xlsx.readFile(filename);

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const sheet_json = xlsx.utils.sheet_to_json(sheet);

    for (const value of sheet_json) {
        let data;
        if (value["OTSIKKO VALIKKOON"] && value["OTSIKKO VALIKKOON"] != "Lääke") data = parseRow(value);
        if (data) insertRow(data, db);
    }

    console.log("Database populated!");
};

const populateDatabase = (filename) => {

    const dbPath = path.join(__dirname, "../../../data/db/inhalers.db");

    if (fs.existsSync(dbPath)) { 
        console.log('Database already exists. Skipping generation.');

    } else {
        const db = require('../db');

        if (fs.existsSync(filename)) {
             runPopulation(db, filename); 
        } else { 
            console.log('Database populating .xlsx file is missing. Skipping population.'); 
        } 
    }
    
    console.log('');
};

module.exports = populateDatabase;

// CLI wrapper
if (require.main === module) {
    const db = require('../db');
    const filename = process.argv[2];
    runPopulation(db, filename);
}