import { applyFilter } from './filter.js';
import { getInhalers, adminLogin, createInhaler, updateInhaler, deleteInhaler } from './api.js';

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

    // DEBUG
    console.log("Filters:");
    console.log(filters);
    console.log("Results:");
    console.log(filtered);
}

const inhalers = await getInhalers();

// DEBUG
console.log("All inhalers:");
console.log(inhalers);

document
    .querySelectorAll(".inhaler-filter")
    .forEach(dropdown => dropdown.addEventListener("change", filterData));

document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("nav");

    navToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    const filterToggle = document.querySelector(".filter-toggle");
    const filterSection = document.querySelector(".search-filter");
    if (filterToggle && filterSection) {
        filterToggle.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                filterSection.classList.toggle("collapsed");
            }
        });
    }

    const clearBtn = document.querySelector(".btn-clear");
    const searchInput = document.getElementById("inhaler-name");
    if (clearBtn && searchInput) {
        clearBtn.addEventListener("click", () => {
            searchInput.value = "";
            searchInput.focus();
        });
    }

    const clearFiltersBtn = document.querySelector(".btn-clear-filters");
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener("click", () => {
            const selects = document.querySelectorAll(".search-filter select");
            selects.forEach(s => s.selectedIndex = 0);
            filterData();
        });
    }

    // admin page: login/panel toggle
    const loginView = document.getElementById("login-view");
    const panelView = document.getElementById("panel-view");

    if (loginView && panelView) {
        function showPanel() {
            loginView.style.display = "none";
            panelView.style.display = "";
        }

        function showLogin() {
            panelView.style.display = "none";
            loginView.style.display = "";
        }

        // check if already logged in
        if (localStorage.getItem("admin-token")) {
            showPanel();
        }

        // show/hide password
        const showPwBtn = document.querySelector(".btn-show-pw");
        const pwInput = document.getElementById("admin-password");
        showPwBtn.addEventListener("click", () => {
            const isHidden = pwInput.type === "password";
            pwInput.type = isHidden ? "text" : "password";
        });

        // login
        const loginForm = document.getElementById("admin-login-form");
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("admin-username").value;
            const password = document.getElementById("admin-password").value;

            const token = await adminLogin(username, password);
            if (token) {
                localStorage.setItem("admin-token", token);
                showPanel();
            } else {
                alert("Virheellinen käyttäjänimi tai salasana");
            }
        });

        // logout
        const logoutBtn = document.querySelector(".btn-logout");
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("admin-token");
            showLogin();
        });

        // add/edit inhaler form
        const addBtn = document.querySelector(".panel-header .btn-add");
        const addFormWrap = document.getElementById("add-form");
        const cancelBtn = document.querySelector(".btn-cancel");
        const addInhalerForm = document.getElementById("add-inhaler-form");
        const tableBody = document.querySelector(".panel-table tbody");
        const formHeading = addFormWrap.querySelector("h3");
        const formSubmitBtn = addFormWrap.querySelector(".btn-add");
        let editingRow = null;

        addBtn.addEventListener("click", () => {
            editingRow = null;
            addInhalerForm.reset();
            formHeading.textContent = "Lisää uusi inhalaattori";
            formSubmitBtn.textContent = "Tallenna";
            addFormWrap.style.display = addFormWrap.style.display === "none" ? "" : "none";
        });

        cancelBtn.addEventListener("click", () => {
            editingRow = null;
            addInhalerForm.reset();
            formHeading.textContent = "Lisää uusi inhalaattori";
            formSubmitBtn.textContent = "Tallenna";
            addFormWrap.style.display = "none";
        });

        function setSelectByText(id, text) {
            const select = document.getElementById(id);
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].textContent === text) {
                    select.selectedIndex = i;
                    return;
                }
            }
            select.selectedIndex = 0;
        }

        function getSelectText(id) {
            const el = document.getElementById(id);
            return el.options[el.selectedIndex].textContent;
        }

        // form fields to object
        function getFormData() {
            return {
                name: document.getElementById("add-name").value,
                form: getSelectText("add-form-select"),
                age: getSelectText("add-age"),
                dosage: getSelectText("add-dosage"),
                velocity: getSelectText("add-velocity"),
                coordination: getSelectText("add-coordination"),
                device: getSelectText("add-device"),
                purpose: getSelectText("add-purpose"),
                drugGroup: getSelectText("add-drug-group"),
                substance: document.getElementById("add-substance").value,
                color: getSelectText("add-color")
            };
        }

        // inhaler to table row
        function buildRow(inhaler) {
            const row = document.createElement("tr");
            row.dataset.id = inhaler.id;

            const fields = [inhaler.name, inhaler.form, inhaler.age, inhaler.color, inhaler.purpose, inhaler.substance];
            fields.forEach(text => {
                const td = document.createElement("td");
                td.textContent = text;
                row.appendChild(td);
            });

            const tdActions = document.createElement("td");
            tdActions.className = "panel-actions";
            const editBtn = document.createElement("button");
            editBtn.className = "btn-edit";
            editBtn.textContent = "Muokkaa";
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn-delete";
            deleteBtn.textContent = "Poista";
            tdActions.append(editBtn, deleteBtn);
            row.appendChild(tdActions);

            return row;
        }

        // edit/delete buttons
        tableBody.addEventListener("click", async (e) => {
            const row = e.target.closest("tr");
            if (!row) return;

            if (e.target.classList.contains("btn-edit")) {
                editingRow = row;
                const cells = row.querySelectorAll("td");

                document.getElementById("add-name").value = cells[0].textContent;
                setSelectByText("add-form-select", cells[1].textContent);
                setSelectByText("add-age", cells[2].textContent);
                setSelectByText("add-color", cells[3].textContent);
                setSelectByText("add-purpose", cells[4].textContent);
                document.getElementById("add-substance").value = cells[5].textContent;

                formHeading.textContent = "Muokkaa inhalaattoria";
                formSubmitBtn.textContent = "Tallenna muutokset";
                addFormWrap.style.display = "";
            }

            if (e.target.classList.contains("btn-delete")) {
                const id = Number(row.dataset.id);
                const ok = await deleteInhaler(id);
                if (ok) {
                    row.remove();
                }
            }
        });

        // save (create or update)
        addInhalerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = getFormData();

            if (editingRow) {
                const id = Number(editingRow.dataset.id);
                const updated = await updateInhaler(id, data);
                if (updated) {
                    const newRow = buildRow(updated);
                    editingRow.replaceWith(newRow);
                }
                editingRow = null;
            } else {
                const created = await createInhaler(data);
                if (created) {
                    tableBody.appendChild(buildRow(created));
                }
            }

            formHeading.textContent = "Lisää uusi inhalaattori";
            formSubmitBtn.textContent = "Tallenna";
            addInhalerForm.reset();
            addFormWrap.style.display = "none";
        });
    }

    // feedback form
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackThanks = document.getElementById("feedback-thanks");
    const feedbackIntro = document.getElementById("feedback-intro");
    if (feedbackForm && feedbackThanks) {
        feedbackForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // TODO: send to backend or Google Forms
            feedbackForm.style.display = "none";
            if (feedbackIntro) feedbackIntro.style.display = "none";
            feedbackThanks.style.display = "";
        });
    }
});
