// Language toggle (fi/sv)
// Add data-i18n="key" to elements for static text translation.
// Add data-i18n-placeholder="key" for input placeholders.
// Dynamic content (inhaler data) comes translated from the backend via ?lang= param.

var DEFAULT_LANG = "fi";

// Swedish translations. Finnish is the default in HTML, no need to list here.
// Add more keys as needed, matching the data-i18n attributes in HTML.
// Placeholder translations, replace with real Swedish later
var sv = {
    "nav.about": "Om denna webbplats",
    "nav.feedback": "Feedback",
    "nav.admin": "Admin",
    "site.title": "Inhalaattorit.fi",
    "search.heading": "Sök efter ett läkemedel / en inhalator med namn",
    "search.clear": "Rensa",
    "search.label": "Namn",
    "search.counter": "Visar {current}/{total}",
    "filters.heading": "Filter",
    "filters.form": "Läkemedelsform",
    "filters.form-option": "Välj läkemedelsform",
    "filters.age": "Ålder",
    "filters.age-option": "Välj ålder",
    "filters.dosage": "Dosering",
    "filters.dosage-option": "Välj dosering",
    "filters.velocity": "Inandningstakt",
    "filters.velocity-option": "Välj inandningstakt",
    "filters.coordination": "Koordinationsförmåga",
    "filters.coordination-option": "Välj koordinationsförmåga",
    "filters.type": "Inhalator",
    "filters.type-option": "Välj inhalator",
    "filters.purpose": "Användning",
    "filters.purpose-option": "Välj användning",
    "filters.drug-group": "Läkemedelsgrupp",
    "filters.drug-group-option": "Välj läkemedelsgrupp",
    "filters.substance": "Aktiv substans",
    "filters.substance-option": "Välj aktiv substans",
    "filters.color": "Färg",
    "filters.color-option": "Välj färg",
    "filters.clear": "Rensa filter",
    "results.heading": "Inhalatorer",
    "about.heading": "Om webbplatsen",
    "feedback.heading": "Feedback",
    "privacy.heading": "Dataskyddsbeskrivning",
    "privacy.link": "Dataskyddsbeskrivning",
    "search.placeholder": "Sök efter namn..."
};

const fiCounter = "Näytetään {current}/{total}";

export function getCounterString() {
    const el = document.getElementById("result-count");
    const key = el.dataset.i18n;

    if (getLang() === "fi") {
        return fiCounter;
    } else if (sv[key]) {
        return sv[key];
    }
}

export function getLang() {
    return localStorage.getItem("lang") || DEFAULT_LANG;
}

function applyTranslations(lang) {
    // text content
    document.querySelectorAll("[data-i18n]").forEach(function(el) {
        var key = el.dataset.i18n;
        if (lang === "fi") {
            if (el.dataset.i18nOriginal) el.textContent = el.dataset.i18nOriginal;
        } else if (sv[key]) {
            if (!el.dataset.i18nOriginal) el.dataset.i18nOriginal = el.textContent;
            el.textContent = sv[key];
        }
    });

    // placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el) {
        var key = el.dataset.i18nPlaceholder;
        if (lang === "fi") {
            if (el.dataset.i18nOrigPh) el.placeholder = el.dataset.i18nOrigPh;
        } else if (sv[key]) {
            if (!el.dataset.i18nOrigPh) el.dataset.i18nOrigPh = el.placeholder;
            el.placeholder = sv[key];
        }
    });

    document.documentElement.lang = lang;
}

function updateToggle(lang) {
    var btn = document.querySelector(".lang-toggle");
    if (btn) btn.textContent = lang === "fi" ? "SV" : "FI";
}

document.addEventListener("DOMContentLoaded", function() {
    var lang = getLang();
    var btn = document.querySelector(".lang-toggle");

    if (btn) {
        btn.addEventListener("click", function() {
            var next = getLang() === "fi" ? "sv" : "fi";
            localStorage.setItem("lang", next);
            applyTranslations(next);
            updateToggle(next);
        });
    }

    updateToggle(lang);
    if (lang !== DEFAULT_LANG) applyTranslations(lang);
});