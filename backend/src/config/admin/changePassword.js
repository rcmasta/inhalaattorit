const fs = require('fs');
const bcrypt = require('bcrypt');
const genPassword = require('./genPassword');

let admins = require('../../../data/admindata/admins.json');

const username = process.argv[2]
const passwordLen = process.argv[3];

const admin = admins.find(a => a.username === username);
if (!admin) {
    console.log(`No admin with username '${username}'!`);
    return;
}

// generate cryptographically secure random password
genPassword(passwordLen, (err, pw) => {
    if (err) throw err;

    // salt and hash the generated password
    bcrypt.hash(pw, 10, (err, hash) => {
        if (err) throw err;

        // change the password of the admin
        admin.password = hash;

        // write the new admin to admins.json
        fs.writeFileSync('./data/admindata/admins.json', JSON.stringify(admins, null, 2));
        console.log(`Successfully changed password of admin '${username}' to '${pw}'`);
    });
});
