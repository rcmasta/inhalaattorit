
import { getFilteredIds } from "./filter.js";
import { getInhalers, getFilters } from "./api.js";
import {
  gridID,
  detailID,
  backButtonID,
  resultCountID,
  renderInhalerGrid,
  setElementVisibility,
  getLastFocusedCard
} from "./render.js";
import { getCounterString, getTranslation } from "./lang.js";
import { openButtonId, closeButtonId, toggleGuidePanel } from "./guide.js";
import {
  getSearchName,
  autoCompleteSearch,
  clearSuggestions,
  getCombinedFilteredIds,
  renderAutoCompleteResults,
} from "./search.js";

const nameClearID = "search-name-clear";
const filterClearID = "search-filter-clear";

var currentInhalers = 0;
var totalInhalers = 0;
var savedScrollPosition = 0;

function updateCounter() {
  const counterStr = getCounterString()
    .replace("{current}", currentInhalers)
    .replace("{total}", totalInhalers);
  const counterEl = document.getElementById("result-count");

  counterEl.textContent = counterStr;
}

function getFilterObject() {
  const selects = document.querySelectorAll(".inhaler-filter");
  const filters = {};

  selects.forEach((select) => {
    filters[select.name] = select.value;
  });

  return filters;
}

function updateResults() {
  const searchInput = document.getElementById("inhaler-name");

  const name = getSearchName(searchInput);
  const filters = getFilterObject();
  const filterIds = getCombinedFilteredIds(inhalers, filters, name);
  //const filterIds = getFilteredIds(inhalers, filters);
  const renderTarget = document.getElementById(gridID);

  currentInhalers = filterIds.size;
  updateCounter();

  [...renderTarget.children].forEach((card) => {
    setElementVisibility(card.id, filterIds.has(card.id));
  });
}

// Add <option> elements to a <select>
function addOptions(selectId, values, labelFn) {
  const select = document.getElementById(selectId);
  if (!select || !values) return;

  for (const val of values) {
    const opt = document.createElement("option");
    opt.value = String(val);
    opt.textContent = labelFn ? labelFn(val) : String(val);
    select.appendChild(opt);
  }
}

// Populate all filter dropdowns from backend data
function populateFilters(filters) {
  if (!filters) return;

  addOptions("inhaler-form-select", filters.intake_styles);

  // No longer an select form
  //const ages = filters.recommended_min_age.slice().sort((a, b) => a - b);
  //addOptions("inhaler-age-select", ages, (v) => v + " v");

  const times = filters.times_a_day.slice().sort((a, b) => a - b);
  addOptions(
    "inhaler-dosage-select",
    times,
    (v) => `${v}${getTranslation("filter.dosage-suffix")}`,
  );

  // Boolean: intake speed
  addOptions("inhaler-velocity-select", ["1", "0"], (v) =>
    v === "1"
      ? getTranslation("filter.speed-good")
      : getTranslation("filter.speed-poor"),
  );

  // Boolean: coordination
  addOptions("inhaler-coordination-select", ["1", "0"], (v) =>
    v === "1"
      ? getTranslation("filter.coord-good")
      : getTranslation("filter.coord-poor"),
  );

  addOptions("inhaler-type-select", filters.inhaler_brand);

  // Purpose maps to two boolean fields, hardcoded options
  addOptions("inhaler-purpose-select", ["treatment", "symptomatic"], (v) =>
    v === "treatment"
      ? getTranslation("filter.treatment")
      : getTranslation("filter.symptomatic"),
  );

  addOptions("inhaler-drug-group-select", filters.drug_class_name);
  addOptions("inhaler-active-substance-select", filters.active_ingredients);
  addOptions("inhaler-color-select", filters.colors);
}

// Update autocomplete suggestions based on current input
function updateAutoComplete() {
  const searchInput = document.getElementById("inhaler-name");
  const resultBox = document.querySelector(".result-box");

  const name = getSearchName(searchInput);
  const results = autoCompleteSearch(inhalers, name, 5);
  renderAutoCompleteResults(resultBox, results, (item) => {
    searchInput.value = item.name;
    clearSuggestions(resultBox);
    updateResults();
  });
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const filterToggle = document.querySelector(".filter-toggle");
  const filterSection = document.querySelector(".search-filter");
  if (filterToggle && filterSection) {
    filterToggle.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        filterSection.classList.toggle("collapsed");
      }
    });
  }

  // Age filter
  document
    .getElementById("inhaler-age-select")
    .addEventListener("input", updateResults);

  // Name search
  const clearNameBtn = document.getElementById(nameClearID);
  const searchInput = document.getElementById("inhaler-name");
  const resultsBox = document.querySelector(".result-box");
  if (clearNameBtn && searchInput && resultsBox) {
    clearNameBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
      clearSuggestions(resultsBox);
      updateResults();
    });
    // Update search suggestions on input
    searchInput.addEventListener("input", () => {
      updateResults();
      updateAutoComplete();
    });
    // Click outside to close resultbox
    document.addEventListener("click", (event) => {
      if (event.target !== searchInput && event.target !== resultsBox) {
        clearSuggestions(resultsBox);
      }
    });
  }

  // Drop-down filters
  const dropDownFilters = document.querySelectorAll(".inhaler-filter");
  if (dropDownFilters) {
    dropDownFilters.forEach((dropdown) =>
      dropdown.addEventListener("change", updateResults),
    );
  }

  // Clear dropdown filters
  const clearFiltersBtn = document.getElementById(filterClearID);
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      const selects = document.querySelectorAll(".search-filter select");
      selects.forEach((s) => (s.selectedIndex = 0));
      updateResults();
    });
  }

  // Back to grid view button
  const backButton = document.getElementById(backButtonID);
  backButton.addEventListener("click", () => {
    setElementVisibility(gridID, true);
    setElementVisibility(resultCountID, true);
    setElementVisibility(backButtonID, false);
    setElementVisibility(detailID, false);
    updateResults();
    // Restore scroll position after making grid visible
    setTimeout(() => {
      window.scrollTo(0, savedScrollPosition);
      document.getElementById(getLastFocusedCard()).focus();
    }, 0);
    // Retain search results after going back from detail view
    updateResults();
  });

  // Language button
  const langBtn = document.querySelector(".lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      setTimeout(() => location.reload(), 50);
      updateCounter();
      renderInhalerGrid(inhalers);
    });
  }

  // Guide panel
  const guideButtonOpen = document.getElementById(openButtonId);
  guideButtonOpen.addEventListener("click", function () {
    toggleGuidePanel(true);
  });

  const guideButtonClose = document.getElementById(closeButtonId);
  guideButtonClose.addEventListener("click", function () {
    toggleGuidePanel(false);
  });
});

// Load data
const [inhalers, filters] = await Promise.all([getInhalers(), getFilters()]);
currentInhalers = totalInhalers = inhalers.length;

populateFilters(filters);
renderInhalerGrid(inhalers);
updateCounter();

// Save scroll position before navigating to detail view
document.getElementById(gridID).addEventListener("click", (event) => {
  if (event.target.closest("." + "card")) {
    savedScrollPosition = window.scrollY;
  }
  window.scrollTo(0, 0);
});
