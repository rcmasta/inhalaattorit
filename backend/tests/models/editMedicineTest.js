const { dbEdit } = require("../../src/models/admin.model")
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 

rl.question("Give id to update: ", (idInput) => {
    const id = parseInt(idInput);

    const updateMedicine = {
        id,
        name: "vaihdetti nimi",
        image_path: "/uusi/path",
        description: "päivitetyt tiedot",
        official_min_age: 4,
        recommended_min_age: 9,
        times_a_day: 2,
        good_intake_speed: 0,
        good_coordination: 1,
        treatment_medicine: 0,
        symptomatic_medicine: 1
    };

    dbEdit(updateMedicine);
    rl.close();
});