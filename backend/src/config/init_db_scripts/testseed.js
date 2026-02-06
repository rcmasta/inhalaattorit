const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");


const db = new Database(path.join(__dirname, "../test_inhalers.db"));

db.pragma("foreign_keys = ON");

// If database empty, fill in with with schema and insert attributes
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
if (tables.length === 0) {
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
    db.exec(schema);
    console.log("Database schema initialized!")


    // Prepare one to many 

    const insert_ages = db.prepare(`
        INSERT INTO age_group (name) VALUES
            ('Aikuinen'),
            ('Lapsi <7'),
            ('Lapsi 7-12'),
            ('Lapsi >12');
    `);

    const insert_dosage = db.prepare(`
        INSERT INTO dosage (name) VALUES    
            ('Kerran päivässä'),
            ('Kaksi kertaa päivässä'),
            ('1x/pv ylläpidossa astma');      
    `);

    const insert_inhalator_req = db.prepare(`
        INSERT INTO inhalation_requirement (name) VALUES    
            ('Sisäänhengitysnopeus hyvä (> 30l/min), hyvä koordinaatio'),
            ('Sisäänhengitysnopeus huono (< 30l/min), hyvä koordinaatio'),
            ('Sisäänhengitysnopeus hyvä (> 30l/min), huono koordinaatio'),
            ('Sisäänhengitysnopeus huono (< 30 l/min), Huono koordinaatio');
    `);


    const insert_inhalers = db.prepare(`
        INSERT INTO inhaler (name) VALUES
            ('Ellipta'),
            ('Diskus'),
            ('Turbuhaler'),
            ('Easyhaler'),
            ('Nexthaler'),
            ('Twisthaler'),
            ('Breezhaler'),
            ('Respimat'),
            ('Evohaler'),
            ('Autohaler'),
            ('Genuair'),
            ('Aerosphere');
    `);



    const insert_colors = db.prepare(`
        INSERT INTO color (name) VALUES
            ('Valkoinen'),
            ('Pinkki'),
            ('Punainen'),
            ('Keltainen'),
            ('Oranssi'),
            ('Violetti'),
            ('Sininen'),
            ('Harmaa'),
            ('Ruskea'),
            ('Vihreä');
    `);


    // Many to many

    // medicine <--> medicine_drug_form <--> drug_form
    const insert_drug_form = db.prepare(`
        INSERT INTO drug_form (name) VALUES
            ('jauhe'),
            ('jauhekapseli'),
            ('suihke'),
            ('suihke sisäänhengityksen laukaisema'),
            ('tilanjatkeella');

    `);

    // medicine <--> medicine_drug_purpose <--> drug_purpose
    const insert_drug_purpose = db.prepare(`
        INSERT INTO drug_purpose (name) VALUES
            ('Hoitava lääke'),
            ('Oirelääke');
    `);

    // medicine <--> medicine_active_ingredient <--> active_ingredient <--> drug_class 
    const insert_active_ingredient = db.prepare(`
        INSERT INTO active_ingredient (name) VALUES
            ('Beklometasoni'),
            ('Budesonidi'),
            ('Flutikasonipropionaatti'),
            ('Flutikasonifuroaatti'),
            ('Mometasoni'),
            ('Siklesonidi'),
            ('Formoteroli'),
            ('Salmeteroli'),
            ('Vilanteroli'),
            ('Indakateroli'),
            ('Olodateroli'),
            ('Tiotropiumbromidi'),
            ('Aklidiniumbromidi'),
            ('Glykopyrroniumbromidi'),
            ('Umeklinidiumbromidi'),
            ('Salbutamoli'),
            ('Terbutaliini');

    `);

    // Yhdistyy vaikuttavaan aineeseen
    const insert_drug_class = db.prepare(`
        INSERT INTO drug_class (name) VALUES
            ('ICS'),
            ('LAMA'),
            ('LABA'),
            ('SABA'),
            ('SAMA');
    `)

}

module.exports = db;