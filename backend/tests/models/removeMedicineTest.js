const inhalers = require("../../src/models/admin/inhalers")
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); 

rl.question("Give id to remove: ", (idInput) => {
    const id = parseInt(idInput);

    inhalers.delete(id);
    rl.close();
});
