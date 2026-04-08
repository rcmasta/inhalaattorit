const fs = require('fs');

let admins = require('../../../data/admindata/admins.json');

const username = process.argv[2]

const admin = admins.find(a => a.username === username);
if (!admin) {
    console.log(`No admin with username '${username}'!`);
    return;
}

admins = admins.filter(a => a.username !== username);

fs.writeFileSync('./data/admindata/admins.json', JSON.stringify(admins, null, 2));
console.log(`Successfully deleted admin '${username}'`);
