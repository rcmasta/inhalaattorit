/**
 * Gets a set of inhaler ids from filters
 * @param {*} data JSON object containing inhalers
 * @param {*} filters JSON object containig filters
 * @returns 
 */
export function getFilteredIds(data, filters) {
    const idSet = new Set();
    
    data.forEach(item => {
        var addToSet = true;
        for (const [key, value] of Object.entries(filters)) {
            if (value === "" || value === null) continue;
            if (!matchesFilter(item, key, value)) {
                addToSet = false;
                break;
            };
        }
        if (addToSet) idSet.add(item.id.toString());
    });

    return idSet;
}

function matchesFilter(item, key, value) {
    // Purpose maps to two separate boolean fields
    if (key === "purpose") {
        if (value === "treatment") return item.treatment_medicine === 1;
        if (value === "symptomatic") return item.symptomatic_medicine === 1;
        return true;
    }

    // Drug class is nested inside active_ingredients
    if (key === "drug_class_name") {
        if (!item.active_ingredients) return false;
        return item.active_ingredients.some(ai => ai.drug_class_name === value);
    }

    // Boolean fields (0/1 in backend)
    if (key === "good_intake_speed" || key === "good_coordination") {
        return item[key] === Number(value);
    }

    // Number fields
    // After
    if (key === "recommended_min_age") {
        return item[key] <= Number(value);
    }
    if (key === "times_a_day") {
        return item[key] === Number(value);
    }

    // Object with name (inhaler_brand: {id, name})
    if (key === "inhaler_brand") {
        return item.inhaler_brand && item.inhaler_brand.name === value;
    }

    // Array of objects with name (intake_styles, active_ingredients, colors)
    if (Array.isArray(item[key])) {
        return item[key].some(obj => obj.name === value);
    }

    // Fallback: simple string match
    return item[key] === value;
}
