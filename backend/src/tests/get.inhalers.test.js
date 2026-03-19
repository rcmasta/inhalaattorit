const { expect } = require("chai");
const db = require('../config/db');


const { getAllInhalers } = require("../models/inhalersModel");


describe("GET inhalers", () => {

    it("should return all inhalers", () => {
        const results = getAllInhalers("fi");

        expect(results).to.be.an("array");
        expect(results.length).to.equal(4); // seeded medicines
    });

    it("should return inhalers with expected structure", () => {
        const results = getAllInhalers("fi");

        const inhaler = results[0];

        expect(inhaler).to.have.property("name");
        expect(inhaler).to.have.property("description");
        expect(inhaler).to.have.property("intake_styles");
        expect(inhaler).to.have.property("active_ingredients");
        expect(inhaler).to.have.property("colors");
    });

    it("should return Finnish translations", () => {
        const results = getAllInhalers("fi");

        expect(results[0].description).to.equal("Tämä on lääkettä");
    });

    it("should return Swedish translations", () => {
        const results = getAllInhalers("sv");

        expect(results[0].description).to.equal("det här är medicin");
    });

    it("should work when optional relations are missing", () => {

        const insert = db.prepare(`
            INSERT INTO medicine (name)
            VALUES (?)
        `);

        const result = insert.run("Minimal Medicine");
        const medId = result.lastInsertRowid;

        db.prepare(`
            INSERT INTO medicine_translation (medicine_id, language, description)
            VALUES (?, ?, ?)
        `).run(medId, "fi", "Minimal description");

        const results = getAllInhalers("fi");

        const minimal = results.find(m => m.name === "Minimal Medicine");

        expect(minimal).to.exist;
        expect(minimal.intake_styles).to.be.an("array");
        expect(minimal.active_ingredients).to.be.an("array");
        expect(minimal.colors).to.be.an("array");
    });

    it("should parse links JSON correctly", () => {

        const results = getAllInhalers("fi");

        expect(results[0].links).to.be.an("object");
        expect(results[0].links).to.have.property("database");
    });

    it("should return empty array when no medicines exist", () => {

        db.exec("DELETE FROM medicine");

        const results = getAllInhalers("fi");

        expect(results).to.be.an("array").that.is.empty;
    });

});