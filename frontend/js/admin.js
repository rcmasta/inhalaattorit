import {
    getInhalers, getInhalersBothLangs, adminLogin,
    createInhaler, updateInhaler, deleteInhaler,
    uploadImage, deleteImage, getAdminFilters,
    getDrugClasses, createDrugClass, updateDrugClass, deleteDrugClass,
    getActiveIngredients, createActiveIngredient, updateActiveIngredient, deleteActiveIngredient,
    getBrands, createBrand, updateBrand, deleteBrand
} from './api.js';
import { getLang } from './lang.js';

let inhalers = [];
let editingId = null;
let filterData = null;

// dynamic text translations for admin panel
const adminTexts = {
    // UI labels
    "Lisää uusi inhalaattori": "Lägg till ny inhalator",
    "Muokkaa inhalaattoria": "Redigera inhalator",
    "Tallenna": "Spara",
    "Tallenna muutokset": "Spara ändringar",
    "Muokkaa": "Redigera",
    "Poista": "Radera",
    "Hoitava": "Behandling",
    "Oirelääke": "Symtom",
    "Hyvä": "God",
    "Huono": "Dålig",
    "Lisää inhalaattorimerkki": "Lägg till inhalatormärke",
    "Muokkaa inhalaattorimerkkiä": "Redigera inhalatormärke",
    "Lisää lääkeaineluokka": "Lägg till läkemedelsgrupp",
    "Muokkaa lääkeaineluokkaa": "Redigera läkemedelsgrupp",
    "Lisää lääkeaine": "Lägg till aktiv substans",
    "Muokkaa lääkeainetta": "Redigera aktiv substans",
    "Lisää": "Lägg till",
    // table suffixes
    " v": " år",
    " krt/pv": " ggr/dag",
    // alerts and confirmations
    "Virheellinen käyttäjänimi tai salasana": "Felaktigt användarnamn eller lösenord",
    "Nimi on pakollinen kenttä.": "Namn är ett obligatoriskt fält.",
    "Haluatko varmasti poistaa inhalaattorin?": "Vill du verkligen radera inhalatorn?",
    "Haluatko varmasti poistaa kuvan?": "Vill du verkligen radera bilden?",
    "Haluatko varmasti poistaa inhalaattorimerkin?": "Vill du verkligen radera inhalatormärket?",
    "Haluatko varmasti poistaa lääkeaineluokan?": "Vill du verkligen radera läkemedelsgruppen?",
    "Haluatko varmasti poistaa lääkeaineen?": "Vill du verkligen radera den aktiva substansen?"
};

function t(text) {
    if (getLang() === "sv" && adminTexts[text]) return adminTexts[text];
    return text;
}

// populate a <select> dropdown from an array of {id, name} objects
function populateSelect(selectEl, items) {
    // keep first option ("Valitse...")
    while (selectEl.options.length > 1) selectEl.remove(1);
    items.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.name;
        selectEl.appendChild(opt);
    });
}

// populate a checkbox fieldset from an array of {id, name} objects
function populateCheckboxes(fieldsetEl, items, namePrefix) {
    let wrap = fieldsetEl.querySelector(".checkbox-options");
    if (!wrap) {
        wrap = document.createElement("div");
        wrap.className = "checkbox-options";
        fieldsetEl.appendChild(wrap);
    }
    wrap.replaceChildren();
    items.forEach(item => {
        const label = document.createElement("label");
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.name = namePrefix;
        cb.value = item.id;
        label.append(cb, " " + item.name);
        wrap.appendChild(label);
    });
}

// get checked IDs from a checkbox group as int array
function getCheckedIds(fieldsetEl) {
    const checked = fieldsetEl.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checked).map(cb => Number(cb.value));
}

// set checked checkboxes by array of IDs or objects with various id keys
function setCheckedIds(fieldsetEl, values) {
    if (!values || !values.length) return;
    const ids = values.map(v => {
        if (typeof v !== "object") return v;
        return v.id || v.intake_style_id || v.color_id || v.active_ingredient_id;
    });
    fieldsetEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = ids.includes(Number(cb.value));
    });
}

// extract unique {id, name} items from inhalers data for dropdown/checkbox options
function extractOptions(inhalersList, field, idKey) {
    const seen = new Map();
    for (const inh of inhalersList) {
        const val = inh[field];
        if (!val) continue;

        if (Array.isArray(val)) {
            for (const item of val) {
                const id = item[idKey];
                if (id != null && !seen.has(id)) seen.set(id, { id, name: item.name });
            }
        } else if (typeof val === "object") {
            const id = val[idKey] || val.id;
            if (id != null && !seen.has(id)) seen.set(id, { id, name: val.name });
        }
    }
    return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name, "fi"));
}

// get localized name from admin filter item (name can be {fi, sv} or plain string)
function getFilterName(item) {
    if (typeof item.name === "object") {
        const lang = getLang();
        return item.name[lang] || item.name.fi || item.name.sv || "";
    }
    return item.name || "";
}

// look up a translated name by id from filterData
function getTranslatedName(type, id) {
    if (!filterData || !filterData[type]) return null;
    const item = filterData[type].find(i => i.id === id);
    if (!item) return null;
    return getFilterName(item);
}

async function loadFilterData() {
    // try admin filters endpoint first, fallback to extracting from inhalers
    const adminFilters = await getAdminFilters();

    if (adminFilters) {
        filterData = adminFilters;
        const toOpts = (arr) => arr.map(i => ({ id: i.id, name: getFilterName(i) }))
            .sort((a, b) => a.name.localeCompare(b.name, "fi"));

        populateSelect(document.getElementById("add-brand"), toOpts(adminFilters.inhaler_brands || []));
        populateCheckboxes(document.getElementById("add-intake-styles"), toOpts(adminFilters.intake_styles || []), "intake_styles");
        populateCheckboxes(document.getElementById("add-colors"), toOpts(adminFilters.colors || []), "colors");
        populateCheckboxes(document.getElementById("add-ingredients"), toOpts(adminFilters.active_ingredients || []), "active_ingredients");
        return;
    }

    // fallback: extract from existing inhalers data
    const allInhalers = await getInhalers();

    const brands = extractOptions(allInhalers, "inhaler_brand", "id");
    const styles = extractOptions(allInhalers, "intake_styles", "intake_style_id");
    const colorList = extractOptions(allInhalers, "colors", "color_id");
    const ingredients = extractOptions(allInhalers, "active_ingredients", "active_ingredient_id");

    populateSelect(document.getElementById("add-brand"), brands);
    populateCheckboxes(document.getElementById("add-intake-styles"), styles, "intake_styles");
    populateCheckboxes(document.getElementById("add-colors"), colorList, "colors");
    populateCheckboxes(document.getElementById("add-ingredients"), ingredients, "active_ingredients");
}

function showPanel(loginView, panelView) {
    loginView.style.display = "none";
    panelView.style.display = "";
}

function showLogin(loginView, panelView) {
    panelView.style.display = "none";
    loginView.style.display = "";
}

function speedText(val) {
    if (val === true || val === 1) return t("Hyvä");
    if (val === false || val === 0) return t("Huono");
    return "-";
}

function buildRow(inhaler) {
    const row = document.createElement("tr");
    row.dataset.id = inhaler.id;

    const purposes = [];
    if (inhaler.treatment_medicine) purposes.push(t("Hoitava"));
    if (inhaler.symptomatic_medicine) purposes.push(t("Oirelääke"));

    const brandName = inhaler.inhaler_brand ? inhaler.inhaler_brand.name : "-";
    const styleNames = inhaler.intake_styles && inhaler.intake_styles.length
        ? inhaler.intake_styles.map(s => {
            const id = s.intake_style_id || s.id;
            return getTranslatedName("intake_styles", id) || s.name;
        }).join(", ")
        : "-";

    const fields = [
        inhaler.name || "-",
        brandName,
        styleNames,
        inhaler.official_min_age != null ? inhaler.official_min_age + t(" v") : "-",
        inhaler.times_a_day != null ? inhaler.times_a_day + t(" krt/pv") : "-",
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
    editBtn.textContent = t("Muokkaa");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = t("Poista");
    tdActions.append(editBtn, deleteBtn);
    row.appendChild(tdActions);

    return row;
}

function getFormData() {
    const data = {};

    const name = document.getElementById("add-name").value.trim();
    if (name) data.name = name;

    // description as {fi, sv} object
    const descFi = document.getElementById("add-description-fi").value.trim();
    const descSv = document.getElementById("add-description-sv").value.trim();
    if (descFi || descSv) {
        data.description = {};
        if (descFi) data.description.fi = descFi;
        if (descSv) data.description.sv = descSv;
    }

    const minAge = document.getElementById("add-min-age").value;
    if (minAge !== "") data.official_min_age = Number(minAge);

    const recAge = document.getElementById("add-rec-age").value;
    if (recAge !== "") data.recommended_min_age = Number(recAge);

    const timesDay = document.getElementById("add-times-day").value;
    if (timesDay !== "") data.times_a_day = Number(timesDay);

    const speed = document.getElementById("add-intake-speed").value;
    if (speed !== "") data.good_intake_speed = Number(speed);

    const coord = document.getElementById("add-coordination").value;
    if (coord !== "") data.good_coordination = Number(coord);

    const treatment = document.getElementById("add-treatment").value;
    if (treatment !== "") data.treatment_medicine = Number(treatment);

    const symptomatic = document.getElementById("add-symptomatic").value;
    if (symptomatic !== "") data.symptomatic_medicine = Number(symptomatic);

    // inhaler brand
    const brand = document.getElementById("add-brand").value;
    if (brand) data.inhaler_brand_id = Number(brand);

    // many-to-many
    const intakeStyles = getCheckedIds(document.getElementById("add-intake-styles"));
    if (intakeStyles.length) data.intake_styles = intakeStyles;

    const colors = getCheckedIds(document.getElementById("add-colors"));
    if (colors.length) data.colors = colors;

    const ingredients = getCheckedIds(document.getElementById("add-ingredients"));
    if (ingredients.length) data.active_ingredients = ingredients;

    // links - stringify for SQLite storage
    const linkDb = document.getElementById("add-link-db").value.trim();
    const linkTut = document.getElementById("add-link-tutorial").value.trim();
    if (linkDb || linkTut) {
        const linksObj = {};
        if (linkDb) linksObj.database = linkDb;
        if (linkTut) linksObj.tutorial = linkTut;
        data.links = JSON.stringify(linksObj);
    }

    return data;
}

// boolean/int to select value
function boolToVal(val) {
    if (val === true || val === 1) return "1";
    if (val === false || val === 0) return "0";
    return "";
}

function showImagePreview(id) {
    const preview = document.getElementById("image-preview");
    const thumb = document.getElementById("image-preview-thumb");
    // try to load thumbnail, show preview if it exists
    const img = new Image();
    img.onload = () => {
        thumb.src = img.src;
        preview.style.display = "";
    };
    img.onerror = () => {
        preview.style.display = "none";
    };
    img.src = "/uploads/thumb/" + id + ".jpeg?t=" + Date.now();
}

function hideImagePreview() {
    const preview = document.getElementById("image-preview");
    preview.style.display = "none";
    document.getElementById("image-preview-thumb").src = "";
}

function populateForm(inhaler) {
    document.getElementById("add-name").value = inhaler.name || "";

    // description can be string (old format) or {fi, sv} from translated API
    if (typeof inhaler.description === "object" && inhaler.description) {
        document.getElementById("add-description-fi").value = inhaler.description.fi || "";
        document.getElementById("add-description-sv").value = inhaler.description.sv || "";
    } else {
        document.getElementById("add-description-fi").value = inhaler.description || "";
        document.getElementById("add-description-sv").value = "";
    }

    document.getElementById("add-min-age").value = inhaler.official_min_age != null ? inhaler.official_min_age : "";
    document.getElementById("add-rec-age").value = inhaler.recommended_min_age != null ? inhaler.recommended_min_age : "";
    document.getElementById("add-times-day").value = inhaler.times_a_day != null ? inhaler.times_a_day : "";
    document.getElementById("add-intake-speed").value = boolToVal(inhaler.good_intake_speed);
    document.getElementById("add-coordination").value = boolToVal(inhaler.good_coordination);
    document.getElementById("add-treatment").value = boolToVal(inhaler.treatment_medicine);
    document.getElementById("add-symptomatic").value = boolToVal(inhaler.symptomatic_medicine);

    // inhaler brand
    const brandId = inhaler.inhaler_brand ? inhaler.inhaler_brand.id : (inhaler.inhaler_brand_id || "");
    document.getElementById("add-brand").value = brandId;

    // many-to-many checkboxes
    setCheckedIds(document.getElementById("add-intake-styles"), inhaler.intake_styles || []);
    setCheckedIds(document.getElementById("add-colors"), inhaler.colors || []);
    setCheckedIds(document.getElementById("add-ingredients"), inhaler.active_ingredients || []);

    // links
    const links = inhaler.links ? (typeof inhaler.links === "string" ? JSON.parse(inhaler.links) : inhaler.links) : {};
    document.getElementById("add-link-db").value = links.database || "";
    document.getElementById("add-link-tutorial").value = links.tutorial || "";
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
        inhalers = await getInhalersBothLangs();
        tableBody.replaceChildren();
        inhalers.forEach(inhaler => {
            tableBody.appendChild(buildRow(inhaler));
        });
    }

    async function initPanel() {
        await loadFilterData();
        loadInhalers();
        loadManagementData();
    }

    // check if already logged in
    if (localStorage.getItem("admin-token")) {
        showPanel(loginView, panelView);
        initPanel();
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
            initPanel();
        } else {
            alert(t("Virheellinen käyttäjänimi tai salasana"));
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
        hideImagePreview();
        formHeading.textContent = t("Lisää uusi inhalaattori");
        formSubmitBtn.textContent = t("Tallenna");
        addFormWrap.style.display = addFormWrap.style.display === "none" ? "" : "none";
    });

    // cancel
    cancelBtn.addEventListener("click", () => {
        editingId = null;
        addInhalerForm.reset();
        hideImagePreview();
        formHeading.textContent = t("Lisää uusi inhalaattori");
        formSubmitBtn.textContent = t("Tallenna");
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
            showImagePreview(id);
            formHeading.textContent = t("Muokkaa inhalaattoria");
            formSubmitBtn.textContent = t("Tallenna muutokset");
            addFormWrap.style.display = "";
        }

        if (e.target.classList.contains("btn-delete")) {
            const id = Number(row.dataset.id);
            if (!confirm(t("Haluatko varmasti poistaa inhalaattorin?"))) return;
            const ok = await deleteInhaler(id);
            if (ok) {
                row.remove();
                inhalers = inhalers.filter(i => i.id !== id);
            }
        }
    });

    // delete image
    document.getElementById("btn-delete-image").addEventListener("click", async () => {
        if (!editingId) return;
        if (!confirm(t("Haluatko varmasti poistaa kuvan?"))) return;
        const ok = await deleteImage(editingId);
        if (ok) hideImagePreview();
    });

    // save (create or update)
    addInhalerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("add-name");
        if (!nameInput.value.trim()) {
            nameInput.focus();
            alert(t("Nimi on pakollinen kenttä."));
            return;
        }

        const data = getFormData();
        const imageFile = document.getElementById("add-image").files[0];
        let savedId = null;

        if (editingId) {
            const ok = await updateInhaler(editingId, data);
            if (ok) savedId = editingId;
        } else {
            savedId = await createInhaler(data);
        }

        if (savedId && imageFile) {
            await uploadImage(savedId, imageFile);
        }

        if (savedId) await loadInhalers();

        editingId = null;
        formHeading.textContent = t("Lisää uusi inhalaattori");
        formSubmitBtn.textContent = t("Tallenna");
        addInhalerForm.reset();
        hideImagePreview();
        // uncheck all checkboxes (reset doesn't always clear dynamically added ones)
        addFormWrap.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        addFormWrap.style.display = "none";
    });

    // --- Section toggles ---
    document.querySelectorAll(".btn-toggle-section").forEach(btn => {
        btn.addEventListener("click", () => {
            const content = btn.nextElementSibling;
            content.style.display = content.style.display === "none" ? "" : "none";
        });
    });

    // --- Drug class management ---
    let drugClasses = [];
    let editingDcId = null;
    const dcTbody = document.getElementById("drug-class-tbody");
    const dcForm = document.getElementById("drug-class-form");
    const dcHeading = document.getElementById("drug-class-form-heading");
    const dcSubmitBtn = document.getElementById("dc-submit-btn");
    const dcCancelBtn = document.getElementById("dc-cancel-btn");
    const dcNameInput = document.getElementById("dc-name");

    function buildDcRow(dc) {
        const row = document.createElement("tr");
        row.dataset.id = dc.id;
        const tdName = document.createElement("td");
        tdName.textContent = dc.name;
        const tdActions = document.createElement("td");
        tdActions.className = "panel-actions";
        const editBtn = document.createElement("button");
        editBtn.className = "btn-edit";
        editBtn.textContent = t("Muokkaa");
        const delBtn = document.createElement("button");
        delBtn.className = "btn-delete";
        delBtn.textContent = t("Poista");
        tdActions.append(editBtn, delBtn);
        row.append(tdName, tdActions);
        return row;
    }

    async function loadDrugClassList() {
        drugClasses = await getDrugClasses();
        dcTbody.replaceChildren();
        drugClasses.forEach(dc => dcTbody.appendChild(buildDcRow(dc)));
        // also update the drug class dropdown in ingredient form
        populateDcDropdown();
    }

    function populateDcDropdown() {
        const sel = document.getElementById("ai-drug-class");
        while (sel.options.length > 1) sel.remove(1);
        drugClasses.forEach(dc => {
            const opt = document.createElement("option");
            opt.value = dc.id;
            opt.textContent = dc.name;
            sel.appendChild(opt);
        });
    }

    function resetDcForm() {
        editingDcId = null;
        dcForm.reset();
        dcHeading.textContent = t("Lisää lääkeaineluokka");
        dcSubmitBtn.textContent = t("Lisää");
        dcCancelBtn.style.display = "none";
    }

    dcTbody.addEventListener("click", async (e) => {
        const row = e.target.closest("tr");
        if (!row) return;
        const id = Number(row.dataset.id);

        if (e.target.classList.contains("btn-edit")) {
            const dc = drugClasses.find(d => d.id === id);
            if (!dc) return;
            editingDcId = id;
            dcNameInput.value = dc.name;
            dcHeading.textContent = t("Muokkaa lääkeaineluokkaa");
            dcSubmitBtn.textContent = t("Tallenna");
            dcCancelBtn.style.display = "";
        }

        if (e.target.classList.contains("btn-delete")) {
            const dc = drugClasses.find(d => d.id === id);
            const usedBy = ingredients.filter(a => a.drug_class_id === id);
            if (usedBy.length > 0) {
                const dcName = dc ? dc.name : "";
                const dcMsg = getLang() === "sv"
                    ? "Läkemedelsgruppen \"" + dcName + "\" kan inte raderas eftersom den har " + usedBy.length + " aktiva substanser. Radera eller flytta substanserna först."
                    : "Lääkeaineluokkaa \"" + dcName + "\" ei voi poistaa, koska siihen kuuluu " + usedBy.length + " lääkeainetta. Poista tai siirrä lääkeaineet ensin.";
                alert(dcMsg);
                return;
            }
            if (!confirm(t("Haluatko varmasti poistaa lääkeaineluokan?"))) return;
            const ok = await deleteDrugClass(id);
            if (ok) {
                await loadDrugClassList();
                await loadFilterData();
            }
        }
    });

    dcForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = dcNameInput.value.trim();
        if (!name) return;

        if (editingDcId) {
            const ok = await updateDrugClass(editingDcId, name);
            if (ok) {
                await loadDrugClassList();
                await loadFilterData();
            }
        } else {
            const id = await createDrugClass(name);
            if (id) {
                await loadDrugClassList();
                await loadFilterData();
            }
        }
        resetDcForm();
    });

    dcCancelBtn.addEventListener("click", resetDcForm);

    // --- Active ingredient management ---
    let ingredients = [];
    let editingAiId = null;
    const aiTbody = document.getElementById("ingredient-tbody");
    const aiForm = document.getElementById("ingredient-form");
    const aiHeading = document.getElementById("ingredient-form-heading");
    const aiSubmitBtn = document.getElementById("ai-submit-btn");
    const aiCancelBtn = document.getElementById("ai-cancel-btn");

    function buildAiRow(ai) {
        const row = document.createElement("tr");
        row.dataset.id = ai.id;
        const tdFi = document.createElement("td");
        tdFi.textContent = ai.fi || "";
        const tdSv = document.createElement("td");
        tdSv.textContent = ai.sv || "";
        const tdClass = document.createElement("td");
        const dc = drugClasses.find(d => d.id === ai.drug_class_id);
        tdClass.textContent = dc ? dc.name : "-";
        const tdActions = document.createElement("td");
        tdActions.className = "panel-actions";
        const editBtn = document.createElement("button");
        editBtn.className = "btn-edit";
        editBtn.textContent = t("Muokkaa");
        const delBtn = document.createElement("button");
        delBtn.className = "btn-delete";
        delBtn.textContent = t("Poista");
        tdActions.append(editBtn, delBtn);
        row.append(tdFi, tdSv, tdClass, tdActions);
        return row;
    }

    async function loadIngredientList() {
        ingredients = await getActiveIngredients();
        aiTbody.replaceChildren();
        ingredients.forEach(ai => aiTbody.appendChild(buildAiRow(ai)));
    }

    function resetAiForm() {
        editingAiId = null;
        aiForm.reset();
        aiHeading.textContent = t("Lisää lääkeaine");
        aiSubmitBtn.textContent = t("Lisää");
        aiCancelBtn.style.display = "none";
    }

    aiTbody.addEventListener("click", async (e) => {
        const row = e.target.closest("tr");
        if (!row) return;
        const id = Number(row.dataset.id);

        if (e.target.classList.contains("btn-edit")) {
            const ai = ingredients.find(a => a.id === id);
            if (!ai) return;
            editingAiId = id;
            document.getElementById("ai-name-fi").value = ai.fi || "";
            document.getElementById("ai-name-sv").value = ai.sv || "";
            document.getElementById("ai-drug-class").value = ai.drug_class_id || "";
            aiHeading.textContent = t("Muokkaa lääkeainetta");
            aiSubmitBtn.textContent = t("Tallenna");
            aiCancelBtn.style.display = "";
        }

        if (e.target.classList.contains("btn-delete")) {
            const ai = ingredients.find(a => a.id === id);
            const usedBy = inhalers.filter(i =>
                i.active_ingredients && i.active_ingredients.some(a =>
                    (a.active_ingredient_id || a.id) === id
                )
            );
            if (usedBy.length > 0) {
                const aiName = ai ? ai.fi : "";
                const aiMsg = getLang() === "sv"
                    ? "Den aktiva substansen \"" + aiName + "\" kan inte raderas eftersom den används av " + usedBy.length + " inhalatorer."
                    : "Lääkeainetta \"" + aiName + "\" ei voi poistaa, koska se on käytössä " + usedBy.length + " inhalaattorilla.";
                alert(aiMsg);
                return;
            }
            if (!confirm(t("Haluatko varmasti poistaa lääkeaineen?"))) return;
            const ok = await deleteActiveIngredient(id);
            if (ok) {
                await loadIngredientList();
                await loadFilterData();
            }
        }
    });

    aiForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fi = document.getElementById("ai-name-fi").value.trim();
        const sv = document.getElementById("ai-name-sv").value.trim();
        const dcId = Number(document.getElementById("ai-drug-class").value);
        if (!fi || !sv || !dcId) return;

        if (editingAiId) {
            const ok = await updateActiveIngredient(editingAiId, fi, sv, dcId);
            if (ok) {
                await loadIngredientList();
                await loadFilterData();
            }
        } else {
            const id = await createActiveIngredient(fi, sv, dcId);
            if (id) {
                await loadIngredientList();
                await loadFilterData();
            }
        }
        resetAiForm();
    });

    aiCancelBtn.addEventListener("click", resetAiForm);

    // --- Inhaler brand management ---
    let brands = [];
    let editingBrandId = null;
    const brandTbody = document.getElementById("brand-tbody");
    const brandForm = document.getElementById("brand-form");
    const brandHeading = document.getElementById("brand-form-heading");
    const brandSubmitBtn = document.getElementById("brand-submit-btn");
    const brandCancelBtn = document.getElementById("brand-cancel-btn");
    const brandNameInput = document.getElementById("brand-name");

    function buildBrandRow(brand) {
        const row = document.createElement("tr");
        row.dataset.id = brand.id;
        const tdName = document.createElement("td");
        tdName.textContent = brand.name;
        const tdActions = document.createElement("td");
        tdActions.className = "panel-actions";
        const editBtn = document.createElement("button");
        editBtn.className = "btn-edit";
        editBtn.textContent = t("Muokkaa");
        const delBtn = document.createElement("button");
        delBtn.className = "btn-delete";
        delBtn.textContent = t("Poista");
        tdActions.append(editBtn, delBtn);
        row.append(tdName, tdActions);
        return row;
    }

    async function loadBrandList() {
        brands = await getBrands();
        brandTbody.replaceChildren();
        brands.forEach(b => brandTbody.appendChild(buildBrandRow(b)));
    }

    function resetBrandForm() {
        editingBrandId = null;
        brandForm.reset();
        brandHeading.textContent = t("Lisää inhalaattorimerkki");
        brandSubmitBtn.textContent = t("Lisää");
        brandCancelBtn.style.display = "none";
    }

    brandTbody.addEventListener("click", async (e) => {
        const row = e.target.closest("tr");
        if (!row) return;
        const id = Number(row.dataset.id);

        if (e.target.classList.contains("btn-edit")) {
            const brand = brands.find(b => b.id === id);
            if (!brand) return;
            editingBrandId = id;
            brandNameInput.value = brand.name;
            brandHeading.textContent = t("Muokkaa inhalaattorimerkkiä");
            brandSubmitBtn.textContent = t("Tallenna");
            brandCancelBtn.style.display = "";
        }

        if (e.target.classList.contains("btn-delete")) {
            // check if brand is in use by any inhaler
            const usedBy = inhalers.filter(i => i.inhaler_brand && i.inhaler_brand.id === id);
            if (usedBy.length > 0) {
                const brand = brands.find(b => b.id === id);
                const brandName = brand ? brand.name : "";
                const brandMsg = getLang() === "sv"
                    ? "Inhalatormärket \"" + brandName + "\" kan inte raderas eftersom det används av " + usedBy.length + " inhalatorer."
                    : "Inhalaattorimerkkiä \"" + brandName + "\" ei voi poistaa, koska se on käytössä " + usedBy.length + " inhalaattorilla.";
                alert(brandMsg);
                return;
            }
            if (!confirm(t("Haluatko varmasti poistaa inhalaattorimerkin?"))) return;
            const ok = await deleteBrand(id);
            if (ok) {
                await loadBrandList();
                await loadFilterData();
            }
        }
    });

    brandForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = brandNameInput.value.trim();
        if (!name) return;

        if (editingBrandId) {
            const ok = await updateBrand(editingBrandId, name);
            if (ok) {
                await loadBrandList();
                await loadFilterData();
            }
        } else {
            const id = await createBrand(name);
            if (id) {
                await loadBrandList();
                await loadFilterData();
            }
        }
        resetBrandForm();
    });

    brandCancelBtn.addEventListener("click", resetBrandForm);

    // reload page on language change so all dynamic content updates
    const langBtn = document.querySelector(".lang-toggle");
    if (langBtn) {
        langBtn.addEventListener("click", () => {
            setTimeout(() => location.reload(), 50);
        });
    }

    async function loadManagementData() {
        await loadBrandList();
        await loadDrugClassList();
        await loadIngredientList();
    }

});
