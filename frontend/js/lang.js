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
    "nav.feedback": "Kontakt",
    "nav.admin": "Admin",
    "site.title": "Inhalaattorit.fi",
    "search.heading": "Sök efter ett läkemedel / en inhalator med namn",
    "search.clear": "Rensa",
    "search.label": "Namn",
    "search.counter": "Visar {current}/{total}",
    "filters.heading": "Filter",
    "filters.form": "Läkemedelsform",
    "filters.form-option": "Välj läkemedelsform",
    "filters.age": "Patientens ålder (om under 18 år)",
    "filters.age-option": "Ange ålder",
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
    "filter.dosage-suffix": " gånger/dag",
    "filter.speed-good": "Bra (>30 l/min)",
    "filter.speed-poor": "Dålig (≤30 l/min)",
    "filter.coord-good": "Bra",
    "filter.coord-poor": "Dålig",
    "filter.treatment": "Behandlingsläkemedel",
    "filter.symptomatic": "Symtomläkemedel",
    "results.heading": "Inhalatorer",
    "about.heading": "Om webbplatsen",
    "feedback.heading": "Kontakt",
    "feedback.intro": "Vill du ge feedback om webbplatsen eller rapportera ett fel? Kontakta oss via e-post:",
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
    "guide.color-body": "Inhalatorns färger, möjliggör sökning på basen av inhalatorns färg",

    // Admin
    "admin.login-heading": "Logga in",
    "admin.username": "Användarnamn",
    "admin.password": "Lösenord",
    "admin.login-btn": "Logga in",
    "admin.forgot-pw": "Glömt lösenordet? Kontakta administratören.",
    "admin.panel-heading": "Kontrollpanel",
    "admin.add-inhaler": "+ Lägg till inhalator",
    "admin.logout": "Logga ut",
    "admin.form-heading": "Lägg till ny inhalator",
    "admin.name": "Namn",
    "admin.desc-fi": "Beskrivning (finska)",
    "admin.desc-fi-ph": "Beskrivning på finska",
    "admin.desc-sv": "Beskrivning (svenska)",
    "admin.min-age": "Officiell åldersgräns (år)",
    "admin.rec-age": "Rekommenderad åldersgräns (år)",
    "admin.times-day": "Dosering (gånger per dag)",
    "admin.intake-speed": "Inandningshastighet",
    "admin.unknown": "Okänt",
    "admin.speed-good": "God (> 30 l/min)",
    "admin.speed-poor": "Dålig (< 30 l/min)",
    "admin.coordination": "Koordination",
    "admin.good": "God",
    "admin.poor": "Dålig",
    "admin.treatment": "Behandlingsläkemedel",
    "admin.symptomatic": "Symtomläkemedel",
    "admin.yes": "Ja",
    "admin.no": "Nej",
    "admin.brand": "Inhalator",
    "admin.select": "Välj...",
    "admin.intake-styles": "Läkemedelsform",
    "admin.colors": "Färg",
    "admin.ingredients": "Aktiv substans",
    "admin.link-db": "Databaslänk",
    "admin.link-tutorial": "Instruktionslänk",
    "admin.image": "Bild",
    "admin.current-image": "Nuvarande bild",
    "admin.delete-image": "Radera bild",
    "admin.save": "Spara",
    "admin.cancel": "Avbryt",
    "admin.th-age": "Åldersgräns",
    "admin.th-dosage": "Ggr/dag",
    "admin.th-purpose": "Användning",
    "admin.th-actions": "Åtgärder",
    "admin.brands-heading": "Inhalatormärken (Ellipta, Turbuhaler...)",
    "admin.brand-add": "Lägg till inhalatormärke",
    "admin.brand-ph": "Namn (t.ex. Ellipta)",
    "admin.dc-heading": "Läkemedelsgrupper (ICS, LABA...)",
    "admin.dc-add": "Lägg till läkemedelsgrupp",
    "admin.dc-ph": "Namn (t.ex. ICS)",
    "admin.ai-heading": "Aktiva substanser",
    "admin.ai-add": "Lägg till aktiv substans",
    "admin.ai-fi-ph": "Namn (finska)",
    "admin.ai-sv-ph": "Namn (svenska)",
    "admin.class": "Grupp",
    "admin.class-select": "Grupp...",
    "admin.name-fi": "Namn (fi)",
    "admin.name-sv": "Namn (sv)",
    "admin.btn-add": "Lägg till",
    "admin.btn-edit": "Redigera",
    "admin.btn-delete": "Radera",

    // Card and detail page
    "card.extension-badge": " + Spacer",
    "card.recommended-age": "Rekommenderad ålder: ",
    "card.active-ingredients": "Aktiva substanser:\n",
    "detail.extension-badge": " + Spacer",
    "detail.inhaler": "Inhalator:",
    "detail.form": "Läkemedelsform:",
    "detail.age-dosage": "Ålder och dosering",
    "detail.official-age": "Officiell åldersgräns:",
    "detail.recommended-age": "Rekommenderad åldergräns:",
    "detail.dosage": "Dosering:",
    "detail.years": " år",
    "detail.times-day": "x gånger per dag",
    "detail.requirements": "Krav",
    "detail.intake-speed": "Inandningshastighet:",
    "detail.speed-high": "Bra (>30 l/min)",
    "detail.speed-low": "Dålig (≤30 l/min)",
    "detail.coordination": "Koordinationsförmåga:",
    "detail.coord-good": "Bra",
    "detail.coord-normal": "Vanlig",
    "detail.purpose": "Användningsändamål",
    "detail.treatment": "Behandlingsläkemedel:",
    "detail.symptomatic": "Symtomläkemedel:",
    "detail.yes": "Ja",
    "detail.no": "Nej",
    "detail.ingredients": "Aktiva substanser",
    "detail.database-link": "Databaslänk",
    "detail.tutorial-link": "Instruktionsvideo"
};

var fi = {
    "card.extension-badge": " + Tilanjatke",
    "card.recommended-age": "Suositeltu ikäraja: ",
    "card.active-ingredients": "Vaikuttavat lääkeaineet:\n",
    "detail.extension-badge": " + Tilanjatke",
    "detail.inhaler": "Inhalaattori:",
    "detail.form": "Lääkemuoto:",
    "detail.age-dosage": "Ikä ja annostelu",
    "detail.official-age": "Virallinen ikäraja:",
    "detail.recommended-age": "Suositeltu ikäraja:",
    "detail.dosage": "Annostelu:",
    "detail.years": " vuotta",
    "detail.times-day": "x päivässä",
    "detail.requirements": "Vaatimukset",
    "detail.intake-speed": "Sisäänhengitysnopeus:",
    "detail.speed-high": "Korkea (>30 l/min)",
    "detail.speed-low": "Matala (≤30 l/min)",
    "detail.coordination": "Koordinaatiokyky:",
    "detail.coord-good": "Hyvä",
    "detail.coord-normal": "Tavallinen",
    "detail.purpose": "Käyttötarkoitus",
    "detail.treatment": "Hoitava lääke:",
    "detail.symptomatic": "Oirelääke:",
    "detail.yes": "Kyllä",
    "detail.no": "Ei",
    "detail.ingredients": "Vaikuttavat lääkeaineet",
    "detail.database-link": "Tietokanta-linkki",
    "detail.tutorial-link": "Opetusvideo",
    "filter.dosage-suffix": " krt/pv",
    "filter.speed-good": "Hyvä (>30 l/min)",
    "filter.speed-poor": "Huono (≤30 l/min)",
    "filter.coord-good": "Hyvä",
    "filter.coord-poor": "Huono",
    "filter.treatment": "Hoitava lääke",
    "filter.symptomatic": "Oirelääke",
    "filters.form-option": "Valitse lääkemuoto",
    "filters.dosage-option": "Valitse annostelu",
    "filters.velocity-option": "Valitse sisäänhengitysnopeus",
    "filters.coordination-option": "Valitse koordinaatiokyky",
    "filters.type-option": "Valitse inhalaattori",
    "filters.purpose-option": "Valitse käyttötarkoitus",
    "filters.drug-group-option": "Valitse lääkeaineryhmä",
    "filters.substance-option": "Valitse vaikuttava lääkeaine",
    "filters.color-option": "Valitse väri",
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

    // Guide URL (only exists on index.html)
    const guideUrl = document.getElementById(guideUrlId);

    document.documentElement.lang = lang;
    if (guideUrl) {
        if (lang === "fi") {
            guideUrl.href = fiGuideUrl;
        } else {
            guideUrl.href = sv["guide.intro-link-url"];
        }
    }
}

function updateToggle(lang) {
    var btn = document.querySelector(".lang-toggle");
    if (btn) btn.textContent = lang === "fi" ? "FI" : "SV";
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


export function getTranslation(key) {
    const lang = getLang();
    if (lang === "fi") {
        return fi[key] || key;
    } else if (lang === "sv") {
        return sv[key] || key;
    }
    return key;
}