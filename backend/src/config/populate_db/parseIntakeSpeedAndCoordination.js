const isChecked = require('./isChecked');
const xlsxIndices = require('./xlsxIndices');

const parseIntakeSpeedAndCoordination = (row) => {
    let good_intake_speed = 1;
    let good_coordination = 1;

    if (isChecked(row[`__EMPTY_${xlsxIndices.BAD_BOTH}`]))         return [0, 0];
    if (isChecked(row[`__EMPTY_${xlsxIndices.BAD_INTAKE}`]))       good_intake_speed = 0;
    if (isChecked(row[`__EMPTY_${xlsxIndices.BAD_COORDINATION}`])) good_coordination = 0;


    return [good_intake_speed, good_coordination];
}

module.exports = parseIntakeSpeedAndCoordination;
