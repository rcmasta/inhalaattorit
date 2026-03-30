
class xlsxIndices {
    static INTAKE_STYLES_FIRST = 1;
    static INTAKE_STYLES_LAST = 3;

    static AGE_FIRST = 4;

    static TIMES_A_DAY = 8; 

    static BAD_COORDINATION = 9;
    static BAD_INTAKE = 10;
    static BAD_BOTH = 11;

    static INHALER_BRAND_FIRST = 12; 
    static INHALER_BRAND_LAST = 22; 

    static USE_SYMPTOMATIC = 23;

    static ACTIVE_INGREDIENT_FIRST = 28;
    static ACTIVE_INGREDIENT_LAST = 43;

    static COLORS_FIRST = 44;
    static COLORS_LAST = 52;

    static DATABASE_LINK = xlsxIndices.COLORS_LAST + 2;
    static TUTORIAL_LINK = xlsxIndices.DATABASE_LINK + 1;
}

module.exports = xlsxIndices;
