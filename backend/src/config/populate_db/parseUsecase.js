const isChecked = require('./isChecked');
const xlsxIndices = require('./xlsxIndices');

const parseUsecase = (row) => {
    let treatment_medicine = 0;
    let symptomatic_medicine = 0;

    // yeah the key has two spaces as of writing this
    if (isChecked(row["LÄÄKKEEN  KÄYTTÖTARKOITUS"]))               treatment_medicine = 1;
    if (isChecked(row[`__EMPTY_${xlsxIndices.USE_SYMPTOMATIC}`])) symptomatic_medicine = 1;

    return [treatment_medicine, symptomatic_medicine];
}

module.exports = parseUsecase;
