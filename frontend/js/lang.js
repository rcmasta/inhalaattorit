// Language toggle (fi/sv)
// Add data-i18n="key" to elements for static text translation.
// Add data-i18n-placeholder="key" for input placeholders.
// Dynamic content (inhaler data) comes translated from the backend via ?lang= param.

var DEFAULT_LANG = "fi";

// Swedish translations. Finnish is the default in HTML, no need to list here.
// Add more keys as needed, matching the data-i18n attributes in HTML.
var sv = {
    "nav.guide": "Anvisning",
    "nav.front-page": "Ingångssida",
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
    "search.placeholder": "Sök efter namn...",
    "guide.close": "Stäng anvisningarna",
    "guide.heading": "Anvisningar för användning av webbplatsen",
    "guide.intro-1": "Webbplatsen har utvecklats för att främja korrekt och säker användning. Webbplatsen tar inte ställning till patientdiagnoser eller till vilka läkemedel som ska förskrivas till patienter utan varje läkare fattar sina egna vårdbeslut baserat på rekommendationer från",
    "guide.intro-link": "God medicinsk praxis",
    "guide.intro-link-url": "https://www.kaypahoito.fi/sv/rekommendationer", // TODO: Update URL also
    "guide.intro-2": "Vid produkterna finns länkar till läkemedelsinformation och instruktionsvideor om inhalatorspecifik läkemedelsintagsteknik, om sådana finns tillgängliga.",
    "guide.medform-heading": "Form av läkemedel",
    "guide.powder": "Pulverinhalator",
    "guide.powder-body": "läkemedlet inhaleras i pulverform direkt från enheten genom egen inandning.",
    "guide.powder-capsule": "Pulverkapselinhalator",
    "guide.powder-capsule-body": "läkemedlet finns i en kapsel som sätts in i enheten före användning, varefter pulvret inhaleras.",
    "guide.spray": "Sprayinhalator",
    "guide.spray-body": "läkemedlet frigörs som en spray så snart enheten trycks ned; vid behov kan den användas med en spacer.",
    "guide.autohaler": "Inhalationsaktiverad sprayinhalator (Autohaler&reg;)",
    "guide.autohaler-body": "läkemedlet frigörs automatiskt när du börjar andas in.",
    "guide.mist": "Soft Mist -Inhalator (Respimat&reg;)",
    "guide.mist-body": "inhalatorn laddas, varefter enheten trycks in för att frigöra en långsam dos som en spray; vid behov kan den användas med en spacer.",
    "guide.age-heading": "Ålder",
    "guide.age-official": "Officiell åldersgräns",
    "guide.age-official-body": "den av läkemedelstillverkaren meddelade godkända användningsåldern",
    "guide.age-recommended": "Rekommenderad ålder",
    "guide.age-recommended-body": "ålder vid vilken användning av läkemedlet och inhalatorn är praktiskt ändamålsenlig, med hänsyn till patientens utvecklingsnivå, inhalationskraft, koordination och behandlingsrekommendationer",
    "guide.dosage-heading": "Dosering",
    "guide.dosage-body": "Dosering 1 eller 2 gånger om dagen",
    "guide.inhalation-heading": "Inhalationshastighet och koordination",
    "guide.inhalation": "Inhalationshastighet",
    "guide.inhalation-body": "i l/min. Gränsvärde 30 l/min. För dem som ligger under detta värde är en dosinhalator med inhalationsspacer mer lämplig. Om inhalationshastigheten är > 30 l/min kan valfri inhalator användas för detta ändamål.",
    "guide.coordination": "Koordination",
    "guide.coordination-body": "enligt läkares bedömning. Är kognitionen och exempelvis handkoordinationen tillräcklig för att ta inhalationsmedicin?",
    "guide.inhaler-heading": "Inhalator",
    "guide.inhaler-body": "Sök efter produkter efter inhalatorer som finns på marknaden",
    "guide.purpose-heading": "Avsedd användning av läkemedlet",
    "guide.purpose-body": "Läkemedel för behandling eller att tas vid behov",
    "guide.medgroup-heading": "Läkemedelsgrupp",
    "guide.ics": "ICS",
    "guide.ics-body": "inhalationskortikosteroid, inhaled corticosteroid",
    "guide.lama": "LAMA",
    "guide.lama-body": "långverkande antikolinergikum, long acting muscarinic antagonist",
    "guide.laba": "LABA",
    "guide.laba-body": "långverkande β2-agonist, long acting β2-agonist",
    "guide.saba": "SABA",
    "guide.saba-body": "kortverkande β2-agonist, short acting β2-agonist",
    "guide.sama": "SAMA",
    "guide.sama-body": "kortverkande antikolinergikum, short acting muscarinic antagonist",
    "guide.substance-heading": "Aktiv substans",
    "guide.substance-body": "Den aktiv substansen/aktiva substanserna i läkemedlet",
    "guide.color-heading": "Färg",
    "guide.color-body": "Inhalatorns färger, möjliggör sökning på basen av inhalatorns färg"
};

const fiCounter = "Näytetään {current}/{total}";
const fiGuideUrl = "https://www.kaypahoito.fi/suositukset";

const guideUrlId = "guide-url";

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

    // Guide URL
    const guideUrl = document.getElementById(guideUrlId);

    document.documentElement.lang = lang;
    if (lang === "fi") {
        guideUrl.href = fiGuideUrl;
    } else {
        guideUrl.href = sv["guide.intro-link-url"];
    }
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