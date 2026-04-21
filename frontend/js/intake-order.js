const intakeStyleSortOrder = new Map([
  ["jauhe", 0],
  ["suihke sisäänhengityksen laukaisemana", 1],
  ["suihke", 2],
  ["tilanjatkeella", 3],
  ["jauhekapseli", 4],
  ["pulverinhalator", 0],
  ["drivgasaerosol utlöses genom inandning", 1],
  ["drivgasaerosol", 2],
  ["med inhalationsspacer", 3],
  ["pulverkapsel", 4],
]);

/**
 * Normalizes the intake style label for consistent comparison
 * @param {*} value The intake style label to normalize
 * @returns {string} The normalized label
 */
function normalizeIntakeStyleLabel(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

/**
 * Gets the sort index for a given intake style label
 * @param {*} value The intake style label
 * @returns {number} The sort index
 */
function getIntakeStyleSortIndex(value) {
  const normalized = normalizeIntakeStyleLabel(value);
  if (intakeStyleSortOrder.has(normalized)) {
    return intakeStyleSortOrder.get(normalized);
  }
  return Number.POSITIVE_INFINITY;
}

/**
 * Sorts intake styles for use in a dropdown
 * @param {*} intakeStyles The array of intake styles to sort
 * @returns {Array} The sorted array of intake styles
 */
export function sortIntakeStylesForDropdown(intakeStyles) {
  if (!Array.isArray(intakeStyles)) return [];

  return intakeStyles.slice().sort((a, b) => {
    const orderA = getIntakeStyleSortIndex(a);
    const orderB = getIntakeStyleSortIndex(b);

    if (orderA !== orderB) return orderA - orderB;

    return String(a).localeCompare(String(b), "fi", { sensitivity: "base" });
  });
}