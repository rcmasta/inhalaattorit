const { expect } = require("chai");
const db = require("../config/db");
const inhalers = require("../models/admin/inhalers");

const createTestInhaler = (suffix) => inhalers.create({
    name: `Put Test Inhaler ${suffix}`,
    description: {
        fi: "Päivitettava kuvaus",
        sv: "Beskrivning att uppdatera"
    },
    intake_styles: [1, 2],
    active_ingredients: [1],
    colors: [1]
});

describe("inhalers.edit()", () => {

    it("should edit multiple relations at once", () => {
        const id = createTestInhaler(`multi-${Date.now()}`);

        const result = inhalers.edit(id, {
            intake_styles: [3, 4],
            active_ingredients: [2, 7],
            colors: [2, 3]
        });

        const styles = db.prepare(
            "SELECT intake_style_id FROM medicine_intake_style WHERE medicine_id = ? ORDER BY intake_style_id"
        ).all(id);

        const ingredients = db.prepare(
            "SELECT active_ingredient_id FROM medicine_active_ingredient WHERE medicine_id = ? ORDER BY active_ingredient_id"
        ).all(id);

        const colors = db.prepare(
            "SELECT color_id FROM medicine_color WHERE medicine_id = ? ORDER BY color_id"
        ).all(id);

        expect(result).to.equal(id);
        expect(styles.map(row => row.intake_style_id)).to.deep.equal([3, 4]);
        expect(ingredients.map(row => row.active_ingredient_id)).to.deep.equal([2, 7]);
        expect(colors.map(row => row.color_id)).to.deep.equal([2, 3]);
    });

    it("should edit one relation at a time", () => {
        const id = createTestInhaler(`single-${Date.now()}`);

        inhalers.edit(id, { intake_styles: [5] });

        let styles = db.prepare(
            "SELECT intake_style_id FROM medicine_intake_style WHERE medicine_id = ? ORDER BY intake_style_id"
        ).all(id);
        let ingredients = db.prepare(
            "SELECT active_ingredient_id FROM medicine_active_ingredient WHERE medicine_id = ? ORDER BY active_ingredient_id"
        ).all(id);
        let colors = db.prepare(
            "SELECT color_id FROM medicine_color WHERE medicine_id = ? ORDER BY color_id"
        ).all(id);

        expect(styles.map(row => row.intake_style_id)).to.deep.equal([5]);
        expect(ingredients.map(row => row.active_ingredient_id)).to.deep.equal([1]);
        expect(colors.map(row => row.color_id)).to.deep.equal([1]);

        inhalers.edit(id, { active_ingredients: [6] });

        styles = db.prepare(
            "SELECT intake_style_id FROM medicine_intake_style WHERE medicine_id = ? ORDER BY intake_style_id"
        ).all(id);
        ingredients = db.prepare(
            "SELECT active_ingredient_id FROM medicine_active_ingredient WHERE medicine_id = ? ORDER BY active_ingredient_id"
        ).all(id);
        colors = db.prepare(
            "SELECT color_id FROM medicine_color WHERE medicine_id = ? ORDER BY color_id"
        ).all(id);

        expect(styles.map(row => row.intake_style_id)).to.deep.equal([5]);
        expect(ingredients.map(row => row.active_ingredient_id)).to.deep.equal([6]);
        expect(colors.map(row => row.color_id)).to.deep.equal([1]);

        inhalers.edit(id, { colors: [4, 5] });

        styles = db.prepare(
            "SELECT intake_style_id FROM medicine_intake_style WHERE medicine_id = ? ORDER BY intake_style_id"
        ).all(id);
        ingredients = db.prepare(
            "SELECT active_ingredient_id FROM medicine_active_ingredient WHERE medicine_id = ? ORDER BY active_ingredient_id"
        ).all(id);
        colors = db.prepare(
            "SELECT color_id FROM medicine_color WHERE medicine_id = ? ORDER BY color_id"
        ).all(id);

        expect(styles.map(row => row.intake_style_id)).to.deep.equal([5]);
        expect(ingredients.map(row => row.active_ingredient_id)).to.deep.equal([6]);
        expect(colors.map(row => row.color_id)).to.deep.equal([4, 5]);
    });

    it("should not work with a false id", () => {
        const falseId = 999999;

        expect(() => inhalers.edit(falseId, { intake_styles: [1] })).to.throw();
    });
});
