const xlsxIndices = require('./xlsxIndices');

const parseLinks = (row) => {
    let database_link = row[`__EMPTY_${xlsxIndices.DATABASE_LINK}`];
    if (!database_link) database_link = null;

    let tutorial_link = row[`__EMPTY_${xlsxIndices.TUTORIAL_LINK}`]
    if (!tutorial_link) tutorial_link = null;

    return [database_link, tutorial_link];
};

module.exports = parseLinks;
