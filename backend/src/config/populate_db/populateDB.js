const xlsx = require('xlsx')
// const db = require('../db');
const parseRow = require('./parseRow');
const insertRow = require('./insertRow');

const filename = process.argv[2];
if (!filename) return console.log("Error: Path to .xlsx file is required!");

const workbook = xlsx.readFile(filename);

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const sheet_json = xlsx.utils.sheet_to_json(sheet);

for (const [key, value] of Object.entries(sheet_json)) {
    let data;
    if (value["OTSIKKO VALIKKOON"]) data = parseRow(value);
    if (data) insertRow(data);
}


