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
        name: "Vaihdettu nimi",
        dosage_id: 2
    };

    dbEdit(updateMedicine);
    rl.close();
});