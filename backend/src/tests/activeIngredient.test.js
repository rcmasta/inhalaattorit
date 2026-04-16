const { expect } = require("chai");
const db = require("../config/db");
const activeIngredient = require("../models/admin/activeIngredient");

describe("activeIngredient model", () => {

    it("should get active ingredients with translations", () => {
        const results = activeIngredient.get();

        expect(results).to.be.an("array").that.is.not.empty;
        expect(results[0]).to.have.property("id");
        expect(results[0]).to.have.property("drug_class_id");
        expect(results[0]).to.have.property("fi");
        expect(results[0]).to.have.property("sv");
    });

    it("should create a new active ingredient with translations", () => {
        const fi = "Testiaine1";
        const sv = "Test ingredient";

        activeIngredient.create(fi, sv, 1);

        const created = db.prepare(
            "SELECT id, drug_class_id FROM active_ingredient ORDER BY id DESC LIMIT 1"
        ).get();

        const translations = db.prepare(
            "SELECT language, name FROM active_ingredient_translation WHERE active_ingredient_id = ? ORDER BY language"
        ).all(created.id);

        expect(created.drug_class_id).to.equal(1);
        expect(translations).to.deep.equal([
            { language: "fi", name: "Testiaine1" },
            { language: "sv", name: "Test ingredient" }
        ]);
    });

    it("should edit active ingredient translations and drug class", () => {
        activeIngredient.create("Muokattava", "Redigerbar", 1);

        const created = db.prepare(
            "SELECT id FROM active_ingredient ORDER BY id DESC LIMIT 1"
        ).get();

        activeIngredient.edit(created.id, "Uusi nimi", "Nytt namn", 3);

        const edited = db.prepare(
            "SELECT id, drug_class_id FROM active_ingredient WHERE id = ?"
        ).get(created.id);

        const translations = db.prepare(
            "SELECT language, name FROM active_ingredient_translation WHERE active_ingredient_id = ? ORDER BY language"
        ).all(created.id);

        expect(edited.drug_class_id).to.equal(3);
        expect(translations).to.deep.equal([
            { language: "fi", name: "Uusi nimi" },
            { language: "sv", name: "Nytt namn" }
        ]);
    });

    it("should delete an active ingredient and its translations", () => {
        activeIngredient.create("Poistettava", "Raderas", 1);

        const created = db.prepare(
            "SELECT id FROM active_ingredient ORDER BY id DESC LIMIT 1"
        ).get();

        activeIngredient.delete(created.id);

        const ingredient = db.prepare(
            "SELECT * FROM active_ingredient WHERE id = ?"
        ).get(created.id);

        const translations = db.prepare(
            "SELECT * FROM active_ingredient_translation WHERE active_ingredient_id = ?"
        ).all(created.id);

        expect(ingredient).to.not.exist;
        expect(translations).to.be.an("array").that.is.empty;
    });
});
