const { expect } = require("chai");

const { getUsedFilters } = require("../src/models/inhalersModel");


describe("GET used filters", () => {

    it("should return filter object with expected properties", () => {
        const result = getUsedFilters("fi");

        expect(result).to.be.an("object");

        expect(result).to.have.property("official_min_age");
        expect(result).to.have.property("recommended_min_age");
        expect(result).to.have.property("times_a_day");

        expect(result).to.have.property("good_intake_speed");
        expect(result).to.have.property("good_coordination");
        expect(result).to.have.property("treatment_medicine");
        expect(result).to.have.property("symptomatic_medicine");

        expect(result).to.have.property("inhaler_brand");
        expect(result).to.have.property("intake_styles");
        expect(result).to.have.property("active_ingredients");
        expect(result).to.have.property("drug_class_name");
        expect(result).to.have.property("colors");
    });

});


it("should return unique values in arrays", () => {
    const result = getUsedFilters("fi");

    const uniqueAges = new Set(result.official_min_age);

    expect(uniqueAges.size).to.equal(result.official_min_age.length);
});


it("should contain correct numeric filters", () => {
    const result = getUsedFilters("fi");

    expect(result.official_min_age).to.have.members([5,6,12]);
    expect(result.recommended_min_age).to.have.members([6,12]);
    expect(result.times_a_day).to.have.members([1,2]);
});


it("should include used inhaler brands", () => {
    const result = getUsedFilters("fi");

    expect(result.inhaler_brand).to.include("Autohaler");
    expect(result.inhaler_brand).to.include("Turbuhaler");
});


it("should include active ingredients", () => {
    const result = getUsedFilters("fi");

    expect(result.active_ingredients).to.include("Beklometasoni");
});


it("should return boolean filter markers", () => {
    const result = getUsedFilters("fi");

    expect(result.good_intake_speed).to.equal("boolean");
    expect(result.good_coordination).to.equal("boolean");
    expect(result.treatment_medicine).to.equal("boolean");
    expect(result.symptomatic_medicine).to.equal("boolean");
});


it("should work for Swedish language", () => {
    const result = getUsedFilters("sv");

    expect(result).to.be.an("object");
    expect(result.intake_styles.length).to.be.greaterThan(0);
});