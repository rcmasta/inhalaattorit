const isChecked = require('./isChecked');
const AGE_FIRST = require('./xlsxIndices').AGE_FIRST;

const getRecommended = (row) => {

    if (isChecked(row[`__EMPTY_${AGE_FIRST}`]))     return parseInt(row['IKÄ']);
    if (isChecked(row[`__EMPTY_${AGE_FIRST + 1}`])) return 7;
    if (isChecked(row[`__EMPTY_${AGE_FIRST + 2}`])) return 12;
    if (isChecked(row[`__EMPTY_${AGE_FIRST + 3}`])) return 18;
}

const parseAge = (row) => {
    const official = parseInt(row['IKÄ']);
    const recommended = getRecommended(row);

    return [official, recommended];
}

module.exports = parseAge;
