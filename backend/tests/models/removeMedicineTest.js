const { dbRemove } = require("../../src/models/admin.model")
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 

rl.question("Give id to remove: ", (idInput) => {
    const id = parseInt(idInput);

    dbRemove(id);
    rl.close();
});
