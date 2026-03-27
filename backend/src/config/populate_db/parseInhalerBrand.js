const isChecked = require('./isChecked');
const xlsxIndices = require('./xlsxIndices');

const parseInhalerBrand = (row) => {
    if (isChecked(row['INHALAATTORI'])) return 1;
    for (let i = xlsxIndices.INHALER_BRAND_FIRST; i <= xlsxIndices.INHALER_BRAND_LAST; i++) {
        if (isChecked(row[`__EMPTY_${i}`])) return i - (xlsxIndices.INHALER_BRAND_FIRST - 2);
    }
}

module.exports = parseInhalerBrand;
