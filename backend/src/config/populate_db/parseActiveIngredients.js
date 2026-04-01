const isChecked = require('./isChecked');
const xlsxIndices = require('./xlsxIndices');

const parseActiveIngredients = (row) => {
    let activeIngredients = [];

    if (isChecked(row['VAIKUTTAVA LÄÄKEAINE'])) activeIngredients.push(1);
    for (let i = xlsxIndices.ACTIVE_INGREDIENT_FIRST; i <= xlsxIndices.ACTIVE_INGREDIENT_LAST; i++) {
        if (isChecked(row[`__EMPTY_${i}`])) activeIngredients.push(i - (xlsxIndices.ACTIVE_INGREDIENT_FIRST - 2));
    }

    return activeIngredients;
}

module.exports = parseActiveIngredients;
