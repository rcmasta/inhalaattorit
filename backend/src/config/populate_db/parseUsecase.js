const isChecked = require('./isChecked');
const xlsxIndices = require('./xlsxIndices');

const parseUsecase = (row) => {
    let treatment_medicine = false;
    let symptomatic_medicine = false;

    if (isChecked(row['LÄÄKKEEN KÄYTTÖTARKOITUS']))               treatment_medicine = true;
    if (isChecked(row[`__EMPTY_${xlsxIndices.USE_SYMPTOMATIC}`])) symptomatic_medicine = true;

    return [treatment_medicine, symptomatic_medicine];
}

module.exports = parseUsecase;
