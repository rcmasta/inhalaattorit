const { dbAdd } = require("../../src/models/admin.model")

const testMedicine = {
    name: "Testilääke",
    image_path: "/on",
    links: "testi.json",

    official_min_age: 5,
    recommended_min_age: 7,
    times_a_day: 1,
    good_intake_speed: 1,
    good_coordination: 0,
    treatment_medicine: 1,
    symptomatic_medicine: 0,
    inhaler_brand_id: 1,

    description: {
        fi: "moi",
        sv: "hei"
    },

    intake_styles: [1, 2],
    active_ingredients: [1],
    colors: [2]
};

dbAdd(testMedicine);