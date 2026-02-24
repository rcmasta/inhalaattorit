// Language toggle (fi/sv)
// Add data-i18n="key" to elements for static text translation.
// Add data-i18n-placeholder="key" for input placeholders.
// Dynamic content (inhaler data) comes translated from the backend via ?lang= param.

(function() {
    var DEFAULT_LANG = "fi";

    // Swedish translations. Finnish is the default in HTML, no need to list here.
    // Add more keys as needed, matching the data-i18n attributes in HTML.
    // Placeholder translations, replace with real Swedish later
    var sv = {
        "nav.about": "Tietoa sivustosta (sv)",
        "nav.feedback": "Palaute (sv)",
        "nav.admin": "Admin (sv)",
        "site.title": "Inhalaattorit.fi",
        "search.heading": "Hae lääke / inhalaattori nimellä (sv)",
        "search.clear": "Tyhjennä (sv)",
        "search.label": "Nimi (sv)",
        "filters.heading": "Suodattimet (sv)",
        "filters.clear": "Tyhjennä suodattimet (sv)",
        "results.heading": "Inhalaattorit (sv)",
        "about.heading": "Tietoa sivustosta (sv)",
        "feedback.heading": "Palaute (sv)",
        "privacy.heading": "Tietosuojaseloste (sv)",
        "privacy.link": "Tietosuojaseloste (sv)",
        "search.placeholder": "Hae nimellä... (sv)"
    };

    function getLang() {
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
})();
