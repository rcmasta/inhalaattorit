/**
 * Apply given filters to given data
 * @param {*} data JSON data to filter
 * @param {*} filters Object containing category-value pairs
 * @returns Filtered JSON data
 */
export function applyFilter(data, filters) {
    const result = data.filter(filterByCategory(filters));

    return result;
}

/**
 * Filtering function for use with JavaScripts own filter function
 * @param {*} categories Object containing category-value pairs
 * @returns Function for JavaScripts filter function
 */
function filterByCategory(categories) {
    return function(item) {
        for (const [key, value] of Object.entries(categories)) {
            // Skip empty categories
            if (value === "" || value === null) {
                continue;
            }

            // Check if category does not exist, or category does not match value
            if (!(key in item) || item[key] !== value) {
                return false;
            }
        }

        return true;
    };
}
