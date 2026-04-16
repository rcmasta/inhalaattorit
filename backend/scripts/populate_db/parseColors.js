const isChecked = require('./isChecked');
const xlsxIndices = require('./xlsxIndices');

const parseColors = (row) => {
    let colors = [];

    if (isChecked(row['VÄRI'])) colors.push(1);
    for (let i = xlsxIndices.COLORS_FIRST; i <= xlsxIndices.COLORS_LAST; i++) {
        if (isChecked(row[`__EMPTY_${i}`])) colors.push(i - (xlsxIndices.COLORS_FIRST - 2));
    }

    return colors;
}

module.exports = parseColors;
