const xlsx = require('xlsx');
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

// CLI wrapper
if (require.main === module) {
    const db = require('../../src/db/database');
    const filename = process.argv[2];
    runPopulation(db, filename);
}