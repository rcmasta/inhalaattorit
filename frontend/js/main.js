import { applyFilter } from './filter.js';
import { getInhalers } from './api.js';
import { renderInhalerGrid } from './render.js'

/**
 * Gathers all selected filters in an object
 * @returns Object containing category-value pairs
 */
function getFilterObject() {
    const selects = document.querySelectorAll(".inhaler-filter");
    const filters = {};

    selects.forEach(select => {
        const key = select.name;
        const value = select.value;

        filters[key] = value;
    });

    return filters;
}

/**
 * Filter fetched inhalers
 */
function filterData() {
    const filters = getFilterObject();
    const filtered = applyFilter(inhalers, filters);

    renderInhalerGrid(filtered);

    // DEBUG
    console.log("Filters:");
    console.log(filters);
    console.log("Results:");
    console.log(filtered);
}

// Document event listeners
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
    const filterToggle = document.querySelector(".filter-toggle");
    const filterSection = document.querySelector(".search-filter");
    if (filterToggle && filterSection) {
        filterToggle.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                filterSection.classList.toggle("collapsed");
            }
        });
    }

    // Name search
    const clearBtn = document.querySelector(".btn-clear");
    const searchInput = document.getElementById("inhaler-name");
    if (clearBtn && searchInput) {
        clearBtn.addEventListener("click", () => {
            searchInput.value = "";
            searchInput.focus();
        });
    }

    // Drop-down filters
    const dropDownFilters = document.querySelectorAll(".inhaler-filter");
    if (dropDownFilters) {
        dropDownFilters.forEach(dropdown => dropdown.addEventListener("change", filterData));
    }

    // Clear dropdown filters
    const clearFiltersBtn = document.querySelector(".btn-clear-filters");
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener("click", () => {
            const selects = document.querySelectorAll(".search-filter select");
            selects.forEach(s => s.selectedIndex = 0);
            filterData();
        });
    }

    // Back to grid view button
    const backButton = document.getElementById("return-to-gridview");
    backButton.addEventListener("click", () => {
        filterData();
    });
});

// Load inhalers
const inhalers = await getInhalers();

// DEBUG
console.log("All inhalers:");
console.log(inhalers);

// Initial rendering
renderInhalerGrid(inhalers);