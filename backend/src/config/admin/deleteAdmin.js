const fs = require('fs');

let admins = require('../../../data/admindata/admins.json');

const username = process.argv[2]

if (!username) {
    console.log('Username required! (npm run delete_admin {username})');
    return;
}

// check that admin with given username exists
const admin = admins.find(a => a.username === username);
if (!admin) {
    console.log(`No admin with username '${username}'!`);
    return;
}

// filter out the admin with the given username (i.e. delete them)
admins = admins.filter(a => a.username !== username);

// write the filtered json array to file
fs.writeFileSync('./data/admindata/admins.json', JSON.stringify(admins, null, 2));
console.log(`Successfully deleted admin '${username}'`);
