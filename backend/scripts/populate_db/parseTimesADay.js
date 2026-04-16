const isChecked = require('./isChecked');
const xlsxIndices = require('./xlsxIndices');

const parseTimesADay = (row) => {
    if (isChecked(row[`__EMPTY_${xlsxIndices.TIMES_A_DAY}`])) return 2;
    return 1;
}

module.exports = parseTimesADay;
