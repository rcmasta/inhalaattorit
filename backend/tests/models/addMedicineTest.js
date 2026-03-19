const { dbAdd } = require("../../src/models/admin.model")

const testMedicine = {
    name: "Testilääke",
    image_path: "/on",
    links: {
            database: "https://pharmacafennica.fi/spc/2011594",
            tutorial: "https://www.youtube.com/watch?v=kZ1UXkbvpqo&list=PLNhllJNrG-R__DjSxaxbltf635aJGmadl&index=28"
        },

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
        sv: "hej"
    },

    intake_styles: [1, 2],
    active_ingredients: [1],
    colors: [2]
};

dbAdd(testMedicine);