const { expect } = require("chai");
const db = require("../config/db");
const inhalers = require("../models/admin/inhalers");

const createTestInhaler = (suffix) => inhalers.create({
    name: `Delete Test Inhaler ${suffix}`,
    description: {
        fi: "Poistettava kuvaus",
        sv: "Beskrivning att ta bort"
    },
    intake_styles: [1, 3],
    active_ingredients: [1, 7],
    colors: [2, 3]
});

describe("inhalers.delete()", () => {

    it("should delete an existing inhaler and remove its relationships", () => {
        const id = createTestInhaler(`existing-${Date.now()}`);

        const result = inhalers.delete(id);

        const medicine = db.prepare("SELECT * FROM medicine WHERE id = ?").get(id);
        const descriptions = db.prepare(
            "SELECT * FROM medicine_translation WHERE medicine_id = ?"
        ).all(id);
        const styles = db.prepare(
            "SELECT * FROM medicine_intake_style WHERE medicine_id = ?"
        ).all(id);
        const ingredients = db.prepare(
            "SELECT * FROM medicine_active_ingredient WHERE medicine_id = ?"
        ).all(id);
        const colors = db.prepare(
            "SELECT * FROM medicine_color WHERE medicine_id = ?"
        ).all(id);

        expect(result).to.equal(id);
        expect(medicine).to.not.exist;
        expect(descriptions).to.be.an("array").that.is.empty;
        expect(styles).to.be.an("array").that.is.empty;
        expect(ingredients).to.be.an("array").that.is.empty;
        expect(colors).to.be.an("array").that.is.empty;
    });

    it("should return null when deleting a non-existing id", () => {
        const falseId = 999999;

        expect(inhalers.delete(falseId)).to.be.null;
    });
});
