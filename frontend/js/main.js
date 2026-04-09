import { getFilteredIds } from './filter.js';
import { getInhalers, getFilters } from './api.js';
import { gridID, detailID, backButtonID, renderInhalerGrid, setElementVisibility } from './render.js'
import { getCounterString } from './lang.js'
import { openButtonId, closeButtonId, toggleGuidePanel } from './guide.js';

var currentInhalers = 0;
var totalInhalers = 0;

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

function filterData() {
  const filters = getFilterObject();
  const filterIds = getFilteredIds(inhalers, filters);
  const renderTarget = document.getElementById(gridID);

  currentInhalers = filterIds.size;
  updateCounter();

  [...renderTarget.children].forEach((card) => {
    setElementVisibility(card.id, filterIds.has(card.id));
  });

  //renderInhalerGrid(filtered);
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

  const ages = filters.recommended_min_age.slice().sort((a, b) => a - b);
  addOptions("inhaler-age-select", ages, (v) => v + " v");

  const times = filters.times_a_day.slice().sort((a, b) => a - b);
  addOptions("inhaler-dosage-select", times, (v) => v + " krt/pv");

  // Boolean: intake speed
  addOptions("inhaler-velocity-select", ["1", "0"], (v) =>
    v === "1" ? "Hyvä (>30 l/min)" : "Huono (<30 l/min)",
  );

  // Boolean: coordination
  addOptions("inhaler-coordination-select", ["1", "0"], (v) =>
    v === "1" ? "Hyvä" : "Huono",
  );

  addOptions("inhaler-type-select", filters.inhaler_brand);

  // Purpose maps to two boolean fields, hardcoded options
  addOptions("inhaler-purpose-select", ["treatment", "symptomatic"], (v) =>
    v === "treatment" ? "Hoitava lääke" : "Oirelääke",
  );

  addOptions("inhaler-drug-group-select", filters.drug_class_name);
  addOptions("inhaler-active-substance-select", filters.active_ingredients);
  addOptions("inhaler-color-select", filters.colors);
}

function getSearchName() {
  const searchInput = document.getElementById("inhaler-name");
  return searchInput ? searchInput.value.trim() : "";
}

function filterByName() {
  const name = getSearchName();

  const nameFiltered = inhalers.filter((inhaler) =>
    inhaler.name.toLowerCase().includes(name.toLowerCase()),
  );

  const renderTarget = document.getElementById(gridID);
  currentInhalers = nameFiltered.length;
  updateCounter();

  [...renderTarget.children].forEach((card) => {
    setElementVisibility(
      card.id,
      nameFiltered.some((inhaler) => inhaler.id.toString() === card.id),
    );
  });
}

function selectInputText(inputEl) {
  const searchInput = document.getElementById("inhaler-name");
  const resultsBox = document.querySelector(".result-box");
  if (!searchInput || !resultsBox) return;

  searchInput.value = inputEl.textContent;
  resultsBox.innerHTML = "";
  searchInput.focus();
  filterByName();
}

function autoCompleteSearch() {
  const name = getSearchName();
  const resultsBox = document.querySelector(".result-box");
  if (!resultsBox) return;

  const results =
    name.length > 0
      ? inhalers.filter((inhaler) =>
          inhaler.name.toLowerCase().includes(name.toLowerCase()),
        )
      : [];

  if (results.length === 0) {
    resultsBox.innerHTML = "";
    return;
  }

  const ul = document.createElement("ul");

  results.forEach((inhaler) => {
    const li = document.createElement("li");
    li.dataset.id = inhaler.id;
    li.textContent = inhaler.name;

    li.addEventListener("click", () => {
      selectInputText(li);
    });

    ul.appendChild(li);
  });

  resultsBox.innerHTML = "";
  resultsBox.appendChild(ul);
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
  document.getElementById("inhaler-age-select").addEventListener("input", filterData);

  // Name search
  const clearBtn = document.querySelector(".btn-clear");
  const searchInput = document.getElementById("inhaler-name");
  const resultsBox = document.querySelector(".result-box");
  if (clearBtn && searchInput && resultsBox) {
    clearBtn.addEventListener("click", () => {
      resultsBox.innerHTML = "";
      searchInput.value = "";
      searchInput.focus();
      filterData();
    });

    searchInput.addEventListener("input", filterByName);
    searchInput.addEventListener("input", autoCompleteSearch);
  }

  // Drop-down filters
  const dropDownFilters = document.querySelectorAll(".inhaler-filter");
  if (dropDownFilters) {
    dropDownFilters.forEach((dropdown) =>
      dropdown.addEventListener("change", filterData),
    );
  }

  // Clear dropdown filters
  const clearFiltersBtn = document.querySelector(".btn-clear-filters");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      const selects = document.querySelectorAll(".search-filter select");
      selects.forEach((s) => (s.selectedIndex = 0));
      filterData();
    });
  }

  // Back to grid view button
  const backButton = document.getElementById(backButtonID);
  backButton.addEventListener("click", () => {
    setElementVisibility(gridID, true);
    setElementVisibility(backButtonID, false);
    setElementVisibility(detailID, false);
    filterData();
  });

    // Language button
    const langBtn = document.querySelector(".lang-toggle");
    if (langBtn) {
        langBtn.addEventListener("click", function() {
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
    guideButtonClose.addEventListener("click", function() {
        toggleGuidePanel(false);
    });
});

// Load data
const [inhalers, filters] = await Promise.all([getInhalers(), getFilters()]);
currentInhalers = totalInhalers = inhalers.length;

populateFilters(filters);
renderInhalerGrid(inhalers);
updateCounter();
