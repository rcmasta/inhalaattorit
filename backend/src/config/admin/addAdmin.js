const fs = require('fs');
const bcrypt = require('bcrypt');
const genPassword = require('./genPassword');

let admins = require('../../../data/admindata/admins.json');

const username = process.argv[2]
const passwordLen = parseInt(process.argv[3]);

if (!username || !passwordLen) {
    console.log('Username and password length required! (npm run add_admin {username} {password length})');
    return;
}

// generate cryptographically secure random password
genPassword(passwordLen, (err, pw) => {
    if (err) throw err;

    // salt and hash the generated password
    bcrypt.hash(pw, 10, (err, hash) => {
        if (err) throw err;

        admins.push({
                     "username":username, 
                     "password":hash
        });

        // write the new admin to admins.json
        fs.writeFileSync('./data/admindata/admins.json', JSON.stringify(admins, null, 2));
        console.log(`Successfully generated admin '${username}' with password '${pw}'`);
    });
});
