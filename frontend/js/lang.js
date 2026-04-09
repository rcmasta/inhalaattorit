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
    "about.bg-heading": "Bakgrund och mål",
    "about.bg-sub": "Bakgrund",
    "about.bg-body": "Astma och kronisk obstruktiv lungsjukdom (KOL) drabbar hundratusentals patienter i Finland. Behandlingen består av inhalerade läkemedel som administreras med hjälp av olika inhalationshjälpmedel, dvs. inhalatorer. Det finns dussintals effektiva läkemedel och kombinationer av dessa, samt olika inhalatorer (för närvarande över 50). Denna mångfald gör det möjligt att välja det lämpligaste läkemedlet för varje enskild patient, men om man inte är väl förtrogen med dessa läkemedel kan det vara svårt att veta vilket av dessa och vilken typ av inhalator som är lämplig för just den enskilda patienten baserat på bl.a. ålder, individuella egenskaper och behov.",
    "about.goals-sub": "Mål",
    "about.goals-body": "Målet med webbplatsen Inhalaattorit.fi är att förbättra behandlingen av astma och kronisk obstruktiv lungsjukdom hos barn och vuxna genom att hjälpa med valet av rätt typ av inhalator. Webbplatsen hjälper också vård- och apotekspersonal att navigera i det stora utbudet av inhalatorer som finns tillgängliga. Detta kan förebygga att olämpliga inhalatorer ordineras till patienter vilket i sin tur kan förbättra patienternas följsamhet till behandlingen och underlätta patienthandledningen och vårdbalansen. En grupp experter som specialiserat sig på behandling av astma och KOL hos barn och vuxna ansvarar för att innehållet på webbplatsen är korrekt. Webbplatsen innehåller alla inhalationsläkemedel som är godkända för försäljning och finns på marknaden i Finland, men inte specialtillståndsläkemedel.",
    "about.cite-heading": "Hur man citerar denna webbplats",
    "about.cite-pre": "Rantala H, Csonka P, Lehtimäki L, et al.: Inhalatorwebbplats. Publicerad XXX. ",
    "about.cite-post": ". Åtkomst [datum].",
    "about.authors-heading": "Författare",
    "about.leaders-heading": "Projektledare",
    "about.leader-1": "Heidi Rantala, MD, specialist i lungsjukdomar och allergologi, klinisk lärare, Tammerfors universitet och Tammerfors universitetssjukhus",
    "about.leader-2": "Péter Csonka, MD, docent i pediatrik, specialist i pediatrik, barnallergolog, Tammerfors universitet och Terveystalo",
    "about.medical-heading": "Medicinska experter",
    "about.medical-1": "Lauri Lehtimäki, MD, professor i lungsjukdomar och allergologi, specialist i lungsjukdomar och allergologi, Tammerfors universitet och Tammerfors universitetssjukhus",
    "about.medical-2": "Lina Wistbacka, ML, läkare i specialistutbildning i lungsjukdomar och allergologi, specialist i allmänmedicin, Tammerfors universitetssjukhus, Tammerfors universitet",
    "about.medical-3": "Elina Siltanen, sjuksköterska, Tammerfors universitetssjukhus",
    "about.medical-4": "Tea Airenne, farmaceut, Tammerfors universitetssjukhus",
    "about.medical-5": "Roosa Hurme, farmaceut, Tammerfors universitetssjukhus",
    "about.it-heading": "IT-specialister",
    "about.disclaimer-heading": "Ansvarsfriskrivning",
    "about.disclaimer-1": "Webbplatsen Inhalaattorit.fi är endast avsedd för vårdpersonal (läkare, sjuksköterskor, farmaceuter och provisorer) och är inte en medicinteknisk produkt. Webbplatsen är avsedd för allmän information och beskrivande material om medicindispensrar och har inte något medicinskt syfte i enlighet med EU:s förordning om medicintekniska produkter (MDR) (t.ex. diagnos, övervakning eller prognosbedömning av en sjukdom). Webbplatsen behandlar inte heller enskilda användares hälsoinformation. Läkemedelsutbudet baseras på det utbud som är godkänt för försäljning och finns på marknaden i Finland.",
    "about.disclaimer-2": "Denna webbplats är inte avsedd för diagnos, behandling, övervakning eller förebyggande av sjukdomar. När läkare fattar beslut om behandling måste de använda sitt eget omdöme och sin professionella expertis för varje enskild patient. Läkaren är ansvarig för de läkemedel som hen ordinerar och för att säkerställa att det valda läkemedlet och den förskrivna dosen överensstämmer med gällande behandlingsrekommendationer. Läkaren är alltid skyldig att kontrollera valet av läkemedel och dosering. Innehållet på denna webbplats ersätter inte bedömningen av en vårdpersonal. Webbplatsen ger inga behandlingsinstruktioner och tar inte ställning till medicindoser eller val av medicinering utan dessa beslutar den behandlande läkaren om. Webbplatsen hjälper dig att välja rätt inhalator, beroende på om du vill välja en spray- eller pulverinhalator, baserat på gällande behandlingsrekommendationer och med hänsyn till patientens inhalationshastighet och koordination. Dessutom använder webbplatsen bilder för att hjälpa vård- och apotekspersonal att visa patienterna vilka läkemedel de använder eller för att avgöra vilka läkemedel patienterna använder och hur de använder dem, och vid behov hänvisar den dem till videor med doseringsinstruktioner för inhalatorer. Webbplatsen ersätter inte till exempel Pharmaca Fennica eller Fimeas läkemedelssökning, utan kompletterar dem, och på denna webbplats finns länkar till en webbplats där officiella sammanfattningar och produktinformation finns.",
    "about.disclaimer-3": "Webbplatsadministratören kan inte kontrollera hur webbplatsanvändarna använder webbplatsens innehåll och är därför inte ansvarig för direkta, indirekta, omedelbara, följdskador, straffskador eller andra skador som direkt eller indirekt kan uppstå till följd av användningen av webbplatsens information. Inhalaattorit.fi ansvarar inte för några förluster, rättsliga förfaranden, anspråk, åtgärder, krav eller kostnader eller skador, oavsett vad de kan vara eller hur de kan uppstå, som direkt eller indirekt kan uppstå till följd av användningen av webbplatsen Inhalaattorit.fi.",
    "about.funding-heading": "Finansiering",
    "about.funding-body": "Inhalaattorit.fi-webbplatsen är oberoende av politiska, kommersiella och andra externa intressen. Den första versionen av webbplatsen skapades som en del av kursen Software Engineering Project vid Tammerfors universitet. De medicinska experterna erhåller ingen ersättning. Kostnaderna för underhåll och vidareutveckling täcks av bidrag från olika stiftelser.",
    "about.supporters-heading": "Supportrar",
    "about.supporter-1": "Avohoidon Tutkimussäätiö (Forskningsstiftelsen för öppenvård): ",
    "feedback.heading": "Kontakt",
    "feedback.intro": "Vill du ge feedback om webbplatsen eller rapportera ett fel? Kontakta oss via e-post:",
    "privacy.heading": "Dataskyddsbeskrivning",
    "privacy.link": "Dataskyddsbeskrivning",
    "privacy.intro": "Denna beskrivning förklarar hur uppgifter behandlas på webbplatsen Inhalaattorit.fi. Webbplatsen är utformad så att den inte samlar in identifierande personuppgifter. Beskrivningen följer principerna i EU:s allmänna dataskyddsförordning (GDPR).",
    "privacy.controller-heading": "Personuppgiftsansvarig",
    "privacy.controller-body": "Personuppgiftsansvarig preciseras senare (t.ex. Tammerfors universitet eller den forskningsgrupp som ansvarar för webbplatsen).",
    "privacy.contact-heading": "Kontaktuppgifter i dataskyddsfrågor",
    "privacy.contact-body": "Kontakter som rör dataskydd kan skickas till en e-postadress som preciseras senare.",
    "privacy.data-heading": "Behandlade uppgifter",
    "privacy.data-body": "Webbplatsen samlar inte in eller behandlar identifierande personuppgifter. Endast anonym användningsstatistik samlas in: besöksantal, använd webbläsartyp, använd enhet samt besökarens ungefärliga land. IP-adresser lagras inte och enskilda besökare kan inte identifieras personligen.",
    "privacy.purpose-heading": "Ändamål och rättslig grund för behandlingen",
    "privacy.purpose-body": "Anonym statistik används för att följa upp och utveckla webbplatsens funktion. Den rättsliga grunden för behandlingen är den personuppgiftsansvariges berättigade intresse (GDPR artikel 6.1 f).",
    "privacy.source-heading": "Uppgiftskälla",
    "privacy.source-body": "Statistiken samlas automatiskt in från användarnas webbläsare när de besöker webbplatsen. Inga uppgifter begärs separat av användaren.",
    "privacy.retention-heading": "Lagringstid",
    "privacy.retention-body": "Anonym statistik lagras så länge den är användbar för uppföljning och utveckling av webbplatsen. Den exakta lagringstiden preciseras senare.",
    "privacy.recipients-heading": "Mottagare och utlämning av uppgifter",
    "privacy.recipients-body": "Uppgifterna lämnas inte ut till tredje part för marknadsföring eller annan användning. Webbplatsen använder följande tjänsteleverantörer för det tekniska genomförandet: GoatCounter (integritetsvänlig analys) och Railway (webbhotell).",
    "privacy.transfer-heading": "Överföring av uppgifter utanför EU eller EES",
    "privacy.transfer-body": "Eventuell överföring av uppgifter utanför EU och EES beror på var de använda tjänsteleverantörernas servrar är placerade. Preciseras senare.",
    "privacy.cookies-heading": "Cookies",
    "privacy.cookies-body": "Webbplatsen använder inte spårningscookies eller andra spårningstekniker i användarens webbläsare. Det använda analysverktyget (GoatCounter) samlar in uppgifter utan cookies.",
    "privacy.security-heading": "Datasäkerhet",
    "privacy.security-body": "Webbplatsens trafik är skyddad med HTTPS-kryptering. Eftersom webbplatsen inte behandlar identifierande personuppgifter finns inga egentliga registeruppgifter som behöver skyddas separat.",
    "privacy.rights-heading": "Den registrerades rättigheter",
    "privacy.rights-body": "Enligt EU:s dataskyddsförordning har den registrerade rätt att granska sina egna uppgifter, begära rättelse eller radering, begränsa eller motsätta sig behandling samt överföra uppgifterna till en annan tjänsteleverantör. Den registrerade har också rätt att lämna in ett klagomål till dataskyddsmyndigheten. Eftersom webbplatsen inte behandlar identifierande personuppgifter kan dessa rättigheter i praktiken inte riktas mot några lagrade uppgifter.",
    "privacy.updates-heading": "Uppdatering av beskrivningen",
    "privacy.updates-body": "Dataskyddsbeskrivningen uppdateras vid behov om webbplatsens databehandling förändras. Senast uppdaterad: april 2026.",
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
    "admin.min-age": "Officiell åldergräns (år)",
    "admin.rec-age": "Rekommenderad åldergräns (år)",
    "admin.times-day": "Dosering (gånger per dag)",
    "admin.intake-speed": "Inandningshastighet",
    "admin.unknown": "Okänt",
    "admin.speed-good": "Bra (> 30 l/min)",
    "admin.speed-poor": "Dålig (< 30 l/min)",
    "admin.coordination": "Koordination",
    "admin.good": "Bra",
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
    "admin.th-age": "Åldergräns",
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
    "admin.name-primary": "Namn (sv)",
    "admin.name-secondary": "Namn (fi)",
    "admin.btn-add": "Lägg till",
    "admin.btn-edit": "Redigera",
    "admin.btn-delete": "Radera",

    // Card and detail page
    "card.extension-badge": " + Spacer",
    "card.recommended-age": "Rekommenderad åldergräns: ",
    "card.active-ingredients": "Aktiva substanser:\n",
    "detail.extension-badge": " + Spacer",
    "detail.inhaler": "Inhalator:",
    "detail.form": "Läkemedelsform:",
    "detail.age-dosage": "Ålder och dosering",
    "detail.official-age": "Officiell åldergräns:",
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
    "card.recommended-age": "Suositeltu ikä: ",
    "card.active-ingredients": "Vaikuttavat lääkeaineet:\n",
    "detail.extension-badge": " + Tilanjatke",
    "detail.inhaler": "Inhalaattori:",
    "detail.form": "Lääkemuoto:",
    "detail.age-dosage": "Ikä ja annostelu",
    "detail.official-age": "Virallinen ikäraja:",
    "detail.recommended-age": "Suositeltu ikä:",
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

// Inline SVG flags as data URIs (small, decorative — no external files needed)
const flagFi = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 11'><rect width='18' height='11' fill='%23fff'/><rect y='4' width='18' height='3' fill='%23003580'/><rect x='5' width='3' height='11' fill='%23003580'/></svg>";
const flagSv = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'><rect width='16' height='10' fill='%23006AA7'/><rect y='4' width='16' height='2' fill='%23FECC00'/><rect x='5' width='2' height='10' fill='%23FECC00'/></svg>";

function updateToggle(lang) {
    var btn = document.querySelector(".lang-toggle");
    if (!btn) return;
    var img = document.createElement("img");
    img.className = "lang-flag";
    img.alt = "";
    img.src = lang === "fi" ? flagFi : flagSv;
    var label = document.createTextNode(lang === "fi" ? "FI" : "SV");
    btn.replaceChildren(img, label);
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