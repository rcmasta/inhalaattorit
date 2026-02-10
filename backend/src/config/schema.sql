
CREATE TABLE medicine (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image_path TEXT,
    description TEXT,


    age_group_id INTEGER,
    dosage_id INTEGER,
    inhalation_requirement_id INTEGER,
    inhaler_id INTEGER,
    color_id INTEGER,

    FOREIGN KEY (age_group_id) REFERENCES age_group(id),
    FOREIGN KEY (dosage_id) REFERENCES dosage(id),
    FOREIGN KEY (inhalation_requirement_id) REFERENCES inhalation_requirement(id),
    FOREIGN KEY (inhaler_id) REFERENCES inhaler(id),
    FOREIGN KEY (color_id) REFERENCES color(id)

);
-- ONE TO MANY vvvv-----------------------------------------------------

CREATE TABLE age_group (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE dosage (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE inhalation_requirement (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Inhalaattorit
CREATE TABLE inhaler (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

-- ---------------------------------------------------------------------

-- MANY TO MANY vvvv----------------------------------------------------

-- Lääkemuoto
CREATE TABLE drug_form (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);


CREATE TABLE medicine_drug_form (
    medicine_id INTEGER NOT NULL,
    drug_form_id INTEGER NOT NULL,

    PRIMARY KEY (medicine_id, drug_form_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id) ON DELETE CASCADE,
    FOREIGN KEY (drug_form_id) REFERENCES drug_form(id) ON DELETE RESTRICT
);


--Lääkeaineryhmä 
CREATE TABLE drug_class ( -- yhdistyy vaikuttavaan aineeseen
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

-- Lääke käyttötarkoitus
CREATE TABLE drug_purpose (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
); 

CREATE TABLE medicine_drug_purpose (
    medicine_id INTEGER NOT NULL,
    drug_purpose_id INTEGER NOT NULL,

    PRIMARY KEY (medicine_id, drug_purpose_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id) ON DELETE CASCADE,
    FOREIGN KEY (drug_purpose_id) REFERENCES drug_purpose(id) ON DELETE RESTRICT  

);


--Vaikuttava aine
CREATE TABLE active_ingredient (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    drug_class_id INTEGER NOT NULL,
    
    FOREIGN KEY (drug_class_id) REFERENCES drug_class(id) ON DELETE RESTRICT
);

CREATE TABLE medicine_active_ingredient (
    medicine_id INTEGER NOT NULL,
    active_ingredient_id INTEGER NOT NULL,

    PRIMARY KEY (medicine_id, active_ingredient_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id) ON DELETE CASCADE,
    FOREIGN KEY (active_ingredient_id) REFERENCES active_ingredient(id) ON DELETE RESTRICT
);


-- Väri
CREATE TABLE color (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE medicine_color (
    medicine_id INTEGER NOT NULL,
    color_id INTEGER NOT NULL,
    
    PRIMARY KEY (medicine_id, color_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES color(id) ON DELETE RESTRICT

);
-- ---------------------------------------------------------------------

/*
* <-- usea vaihtoehto
Lääke
    nimi
    id?
    image_path
    kuvaus?
Lääkemuoto*
    jauhe
    jauhekapseli
    suihke
    suihke sisäänhengityksen laukaisema
    tilanjatkeella
Ikä
    Virallinen ikäraja (yli X vuosi) (lisätietona lapsiin)
    lapset < 7v
    Lapset 7-12v
    Lapset >12v
    Aikuinen > 18v
Annostelu
    Kerran päivässä
    Kaksi kertaa päivässä
    1x/pv ylläpidossa astma
Sisäänhengitysnopeus ja koordinaatio
    Sisäänhengitysnopeus hyvä (> 30l/min), hyvä koordinaatio
    Sisäänhengitysnopeus huono (< 30l/min), hyvä koordinaatio
    Sisäänhengitysnopeus hyvä (> 30l/min), huono koordinaatio
    Sisäänhengitysnopeus huono (< 30 l/min), Huono koordinaatio
Inhalaattori*
    Ellipta
    DIskus
    Trubuhaler
    Easyhaler
    Nexthaler
    Twisthaler
    Breezhaler
    Respimat
    Evohaler
    Autohaler
    Genuair
    Aerosphere
Lääkken käyttötarkoitus*
    Hoitava lääke
    Oirelääke
Lääkeaineryhmä*
    ICS (hengitettävä kortisoni, inhaled corticosteroids)
    LAMA (pitkävaikutteinen antikolinergi, long acting muscarinic antagonist)
    LABA (pitkävaikutteinen β2-agonisti, long acting β2-agonist)
    SABA (lyhytvaikutteinen β2-agonisti, short acting β2-agonist)
    SAMA (lyhytvaikutteinen antikolinergi, short acting muscarinic antagonist)
Vaikuttava lääkeaine*
    Beklometasoni ICS
    Budesonidi ICS
    Flutikasonipropionaatti ICS
    Flutikasonifuroaatti ICS
    Mometasoni ICS
    Siklesonidi ICS
    Formoteroli LABA
    Salmeteroli LABA
    Vilanteroli LABA
    Indakateroli LABA
    Olodateroli LABA
    Tiotropiumbromidi LAMA
    Aklidiniumbromidi LAMA
    Glykopyrroniumbromidi LAMA
    Umeklinidiumbromidi LAMA
    Salbutamoli SABA
    Terbutaliini SABA
Väri
    Valkoinen
    Pinkki
    Punainen
    Keltainen
    Oranssi
    Violetti
    Sininen
    Harmaa
    Ruskea
    Vihreaä
*/