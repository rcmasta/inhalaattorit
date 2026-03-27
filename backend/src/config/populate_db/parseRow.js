const parseIntakeStyles = require('./parseIntakeStyles');
const parseAge = require('./parseAge');
const parseTimesADay = require('./parseTimesADay');
const parseIntakeSpeedAndCoordination = require('./parseIntakeSpeedAndCoordination');
const parseInhalerBrand = require('./parseInhalerBrand');
const parseUsecase = require('./parseUsecase');
const parseActiveIngredients = require('./parseActiveIngredients');
const parseColors = require('./parseColors');

const parseRow = (row) => {
    let data = {};

    data.name = row['OTSIKKO VALIKKOON'].split('®')[0] + '®';

    data.intake_style_ids = parseIntakeStyles(row);
    [data.official_min_age, data.recommended_min_age] = parseAge(row);
    data.times_a_day = parseTimesADay(row);
    [data.good_intake_speed, data.good_coordination] = parseIntakeSpeedAndCoordination(row);
    data.inhaler_brand_id = parseInhalerBrand(row);
    [data.treatment_medicine, data.symptomatic_medicine] = parseUsecase(row);
    data.active_ingredient_ids = parseActiveIngredients(row);
    data.color_ids = parseColors(row);

    return data;
}

module.exports = parseRow;
