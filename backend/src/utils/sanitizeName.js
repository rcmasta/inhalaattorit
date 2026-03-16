
const sanitizeName = (name) => {
    // match characters not alphanumerical or äöå (case insensitive)
    const whitelist = /[^a-zäöå0-9]+/gi;

    // return sanitized name
    return name.replace(whitelist, '');
};

module.exports = sanitizeName;
