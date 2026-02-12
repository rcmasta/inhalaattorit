CREATE TABLE intake_style (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE drug_class (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE active_ingredient (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,

    drug_class_id INTEGER NOT NULL,
    FOREIGN KEY (drug_class_id) REFERENCES drug_class(id)
);

CREATE TABLE color (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE medicine (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    image_path TEXT,
    description TEXT,
    official_min_age INTEGER,
    recommended_min_age INTEGER,
    times_a_day INTEGER,
    good_intake_speed BOOLEAN,
    good_coordination BOOLEAN,
    treatment_medicine BOOLEAN,
    symptomatic_medicine BOOLEAN,

    inhaler_brand_id INTEGER,
    FOREIGN KEY (inhaler_brand_id) REFERENCES inhaler_brand(id)
);

CREATE TABLE inhaler_brand (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);


CREATE TABLE medicine_intake_style (
    medicine_id INTEGER,
    intake_style_id INTEGER,
    PRIMARY KEY (medicine_id, intake_style_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id),
    FOREIGN KEY (intake_style_id) REFERENCES intake_style(id)
);

CREATE TABLE medicine_active_ingredient (
    medicine_id INTEGER,
    active_ingredient_id INTEGER,
    PRIMARY KEY (medicine_id, active_ingredient_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id),
    FOREIGN KEY (active_ingredient_id) REFERENCES active_ingredient(id)
);

CREATE TABLE medicine_color (
    medicine_id INTEGER,
    color_id INTEGER,
    PRIMARY KEY (medicine_id, color_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id),
    FOREIGN KEY (color_id) REFERENCES color(id)
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