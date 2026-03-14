import { getInhalers, adminLogin, createInhaler, updateInhaler, deleteInhaler } from './api.js';

let inhalers = [];
let editingId = null;

function showPanel(loginView, panelView) {
    loginView.style.display = "none";
    panelView.style.display = "";
}

function showLogin(loginView, panelView) {
    panelView.style.display = "none";
    loginView.style.display = "";
}

function speedText(val) {
    if (val === true || val === 1) return "Hyvä";
    if (val === false || val === 0) return "Huono";
    return "-";
}

function buildRow(inhaler) {
    const row = document.createElement("tr");
    row.dataset.id = inhaler.id;

    const purposes = [];
    if (inhaler.treatment_medicine) purposes.push("Hoitava");
    if (inhaler.symptomatic_medicine) purposes.push("Oirelääke");

    const fields = [
        inhaler.name || "-",
        inhaler.official_min_age != null ? inhaler.official_min_age + " v" : "-",
        inhaler.times_a_day != null ? inhaler.times_a_day + " krt/pv" : "-",
        speedText(inhaler.good_intake_speed),
        speedText(inhaler.good_coordination),
        purposes.length ? purposes.join(", ") : "-"
    ];

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

function getFormData() {
    const data = {};

    const name = document.getElementById("add-name").value.trim();
    if (name) data.name = name;

    const description = document.getElementById("add-description").value.trim();
    if (description) data.description = description;

    const imagePath = document.getElementById("add-image-path").value.trim();
    if (imagePath) data.image_path = imagePath;

    const minAge = document.getElementById("add-min-age").value;
    if (minAge !== "") data.official_min_age = Number(minAge);

    const recAge = document.getElementById("add-rec-age").value;
    if (recAge !== "") data.recommended_min_age = Number(recAge);

    const timesDay = document.getElementById("add-times-day").value;
    if (timesDay !== "") data.times_a_day = Number(timesDay);

    const speed = document.getElementById("add-intake-speed").value;
    if (speed !== "") data.good_intake_speed = speed === "1";

    const coord = document.getElementById("add-coordination").value;
    if (coord !== "") data.good_coordination = coord === "1";

    const treatment = document.getElementById("add-treatment").value;
    if (treatment !== "") data.treatment_medicine = treatment === "1";

    const symptomatic = document.getElementById("add-symptomatic").value;
    if (symptomatic !== "") data.symptomatic_medicine = symptomatic === "1";

    return data;
}

// boolean/int to select value
function boolToVal(val) {
    if (val === true || val === 1) return "1";
    if (val === false || val === 0) return "0";
    return "";
}

function populateForm(inhaler) {
    document.getElementById("add-name").value = inhaler.name || "";
    document.getElementById("add-description").value = inhaler.description || "";
    document.getElementById("add-image-path").value = inhaler.image_path || "";
    document.getElementById("add-min-age").value = inhaler.official_min_age != null ? inhaler.official_min_age : "";
    document.getElementById("add-rec-age").value = inhaler.recommended_min_age != null ? inhaler.recommended_min_age : "";
    document.getElementById("add-times-day").value = inhaler.times_a_day != null ? inhaler.times_a_day : "";
    document.getElementById("add-intake-speed").value = boolToVal(inhaler.good_intake_speed);
    document.getElementById("add-coordination").value = boolToVal(inhaler.good_coordination);
    document.getElementById("add-treatment").value = boolToVal(inhaler.treatment_medicine);
    document.getElementById("add-symptomatic").value = boolToVal(inhaler.symptomatic_medicine);
}

// Admin page
document.addEventListener("DOMContentLoaded", () => {
    const loginView = document.getElementById("login-view");
    const panelView = document.getElementById("panel-view");

    if (!loginView || !panelView) return;

    const tableBody = document.querySelector(".panel-table tbody");
    const addBtn = document.querySelector(".panel-header .btn-add");
    const addFormWrap = document.getElementById("add-form");
    const cancelBtn = document.querySelector(".btn-cancel");
    const addInhalerForm = document.getElementById("add-inhaler-form");
    const formHeading = addFormWrap.querySelector("h3");
    const formSubmitBtn = addFormWrap.querySelector(".btn-add");

    async function loadInhalers() {
        inhalers = await getInhalers();
        tableBody.replaceChildren();
        inhalers.forEach(inhaler => {
            tableBody.appendChild(buildRow(inhaler));
        });
    }

    // check if already logged in
    if (localStorage.getItem("admin-token")) {
        showPanel(loginView, panelView);
        loadInhalers();
    }

    // show/hide password
    const showPwBtn = document.querySelector(".btn-show-pw");
    const pwInput = document.getElementById("admin-password");
    showPwBtn.addEventListener("click", () => {
        pwInput.type = pwInput.type === "password" ? "text" : "password";
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
            showPanel(loginView, panelView);
            loadInhalers();
        } else {
            alert("Virheellinen käyttäjänimi tai salasana");
        }
    });

    // logout
    document.querySelector(".btn-logout").addEventListener("click", () => {
        localStorage.removeItem("admin-token");
        showLogin(loginView, panelView);
    });

    // add button
    addBtn.addEventListener("click", () => {
        editingId = null;
        addInhalerForm.reset();
        formHeading.textContent = "Lisää uusi inhalaattori";
        formSubmitBtn.textContent = "Tallenna";
        addFormWrap.style.display = addFormWrap.style.display === "none" ? "" : "none";
    });

    // cancel
    cancelBtn.addEventListener("click", () => {
        editingId = null;
        addInhalerForm.reset();
        formHeading.textContent = "Lisää uusi inhalaattori";
        formSubmitBtn.textContent = "Tallenna";
        addFormWrap.style.display = "none";
    });

    // edit/delete
    tableBody.addEventListener("click", async (e) => {
        const row = e.target.closest("tr");
        if (!row) return;

        if (e.target.classList.contains("btn-edit")) {
            const id = Number(row.dataset.id);
            const inhaler = inhalers.find(i => i.id === id);
            if (!inhaler) return;

            editingId = id;
            populateForm(inhaler);
            formHeading.textContent = "Muokkaa inhalaattoria";
            formSubmitBtn.textContent = "Tallenna muutokset";
            addFormWrap.style.display = "";
        }

        if (e.target.classList.contains("btn-delete")) {
            const id = Number(row.dataset.id);
            const ok = await deleteInhaler(id);
            if (ok) {
                row.remove();
                inhalers = inhalers.filter(i => i.id !== id);
            }
        }
    });

    // save (create or update)
    addInhalerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = getFormData();

        if (editingId) {
            const ok = await updateInhaler(editingId, data);
            if (ok) await loadInhalers();
        } else {
            const ok = await createInhaler(data);
            if (ok) await loadInhalers();
        }

        editingId = null;
        formHeading.textContent = "Lisää uusi inhalaattori";
        formSubmitBtn.textContent = "Tallenna";
        addInhalerForm.reset();
        addFormWrap.style.display = "none";
    });
});
