const fs = require('fs');
const bcrypt = require('bcrypt');
const genPassword = require('./genPassword');
const args = require('args-parser')(process.argv);

let admins = require('../../data/admindata/admins.json');

const username = args.username;
const password = args.password;
const passwordLen = parseInt(args.generate);

if (!username || (!password && !passwordLen)) {
    console.log('Invalid arguments!');
    console.log('Use: npm run add_admin username={username} password={password}');
    console.log(' or: npm run add_admin username={username} generate={password length}');
    return;
}

const addAdmin = (pw) => {
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
}

if (passwordLen) {
    // generate cryptographically secure random password
    genPassword(passwordLen, (err, pw) => {
        if (err) throw err;

        addAdmin(pw);
    });

} else {
    addAdmin(password);
}

