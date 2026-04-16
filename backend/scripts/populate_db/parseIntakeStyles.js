const isChecked = require('./isChecked');
const xlsxIndices = require('./xlsxIndices');

const parseIntakeStyles = (row) => {
    let intakeStyles = [];

    if (isChecked(row['LÄÄKEMUOTO'])) intakeStyles.push(1);
    if (isChecked(row['__EMPTY']))    intakeStyles.push(2);
    for (let i = xlsxIndices.INTAKE_STYLES_FIRST; i <= xlsxIndices.INTAKE_STYLES_LAST; i++) {
        if (isChecked(row[`__EMPTY_${i}`])) intakeStyles.push(i+2);
    }

    return intakeStyles;
}

module.exports = parseIntakeStyles;
