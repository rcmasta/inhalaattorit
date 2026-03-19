const { expect } = require("chai");
const db = require("../config/db");
const drugClass = require("../models/admin/drugClass");

describe("drugClass model", () => {

    it("should get seeded drug classes", () => {
        const results = drugClass.get();

        expect(results).to.be.an("array").that.is.not.empty;
        expect(results[0]).to.have.property("id");
        expect(results[0]).to.have.property("name");
    });

    it("should create a new drug class with sanitized name", () => {
        drugClass.create("Test Class!! 123");

        const created = db.prepare(
            "SELECT * FROM drug_class WHERE name = ?"
        ).get("TestClass123");

        expect(created).to.exist;
        expect(created.name).to.equal("TestClass123");
    });

    it("should edit an existing drug class", () => {
        drugClass.create("Editable Class");

        const created = db.prepare(
            "SELECT id FROM drug_class ORDER BY id DESC LIMIT 1"
        ).get();

        drugClass.edit(created.id, "Edited Class!!");

        const edited = db.prepare(
            "SELECT * FROM drug_class WHERE id = ?"
        ).get(created.id);

        expect(edited.name).to.equal("EditedClass");
    });

    it("should delete a drug class that is not in use", () => {
        drugClass.create("Delete Me");

        const created = db.prepare(
            "SELECT id FROM drug_class ORDER BY id DESC LIMIT 1"
        ).get();

        drugClass.delete(created.id);

        const deleted = db.prepare(
            "SELECT * FROM drug_class WHERE id = ?"
        ).get(created.id);

        expect(deleted).to.not.exist;
    });
});
