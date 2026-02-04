
CREATE TABLE medicine (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    image_path TEXT,
    description TEXT,

    form_id INTEGER FOREIGN KEY,
    age_group_id INTEGER FOREIGN KEY,
    dosage_id INTEGER FOREIGN KEY,
    inhalation_requirement_id FOREIGN KEY,
    inhaler_id FOREIGN KEY,
    drug_purpose_id FOREIGN KEY,
    drug_class_id FOREIGN KEY, --mahdollisesti yhdistetty lääkkeeseen vain
    active_ingredient_id FOREIGN KEY,
    color_id FOREIGN KEY

);

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
Lääkken käyttötarkoitus
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