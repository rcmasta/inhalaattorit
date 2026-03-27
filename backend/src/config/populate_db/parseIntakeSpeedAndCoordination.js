const isChecked = require('./isChecked');
const xlsxIndices = require('./xlsxIndices');

const parseIntakeSpeedAndCoordination = (row) => {
    let good_intake_speed = true;
    let good_coordination = true;

    if (isChecked(row[`__EMPTY_${xlsxIndices.BAD_BOTH}`]))         return [false, false];
    if (isChecked(row[`__EMPTY_${xlsxIndices.BAD_INTAKE}`]))       good_intake_speed = false;
    if (isChecked(row[`__EMPTY_${xlsxIndices.BAD_COORDINATION}`])) good_coordination = false;

    return [good_intake_speed, good_coordination];
}

module.exports = parseIntakeSpeedAndCoordination;
