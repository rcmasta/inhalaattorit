import { getFilteredIds } from "./filter.js";
import { getTranslation } from "./lang.js";
import { extensionIntakeStyleId } from "./render.js";

function intersectSets(setA, setB) {
  const result = new Set();
  for (const id of setA) {
    if (setB.has(id)) result.add(id);
  }
  return result;
}

function toIdSet(array) {
  return new Set(array.map((item) => item.id.toString()));
}

export function getSearchName(inputElement) {
  return inputElement ? inputElement.value.trim() : "";
}

export function getNameFilteredIds(data, name) {
  if (!name) return toIdSet(data);

  const idSet = new Set();
  for (const item of data) {
    if (item.name.toLowerCase().includes(name.toLowerCase())) {
        idSet.add(item.id.toString());
    }
  }
  return idSet;
}

export function getCombinedFilteredIds(data, filters, name) {
  const byFilter = getFilteredIds(data, filters);
  const byName = getNameFilteredIds(data, name);
  return intersectSets(byFilter, byName);
}

export function autoCompleteSearch(data, name, max = 5) {
  if (!name) return [];

  return data
    .filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
    .slice(0, max);
}

export function renderAutoCompleteResults(resultBox, results, onSelect) {
  if (!resultBox) return;

  // Clear previous results
  if (results.length === 0) {
    resultBox.replaceChildren();
    return;
  }

  const ul = document.createElement("ul");

  // Create a list item for each result
  results.forEach((item) => {
    const li = document.createElement("li");
    li.dataset.id = item.id;
    if (item.intake_styles.some((style) => style.intake_style_id === extensionIntakeStyleId)) {
      li.textContent = item.name + getTranslation("card.extension-badge");
    } else {
      li.textContent = item.name;
    }
    li.addEventListener("click", () => onSelect(item));
    ul.appendChild(li);
  });

  resultBox.replaceChildren(ul);
}

export function clearSuggestions(resultBox) {
  if (resultBox) resultBox.replaceChildren();
}
