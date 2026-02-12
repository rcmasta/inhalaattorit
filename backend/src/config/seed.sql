INSERT OR IGNORE INTO age_group (name) VALUES
    ('Lapsi <7'),
    ('Lapsi 7-12'),
    ('Lapsi >12'),
    ('Aikuinen');

INSERT OR IGNORE INTO inhalation_requirement (need_good_speed, need_good_coordination) VALUES
    (1,1),
    (1,0),
    (0,1),
    (0,0);

INSERT OR IGNORE INTO dosage (name) VALUES    
    ('Kerran päivässä'),
    ('Kaksi kertaa päivässä'); 


INSERT OR IGNORE INTO inhaler (name) VALUES
    ('Ellipta'),
    ('Diskus'),
    ('Turbuhaler'),
    ('Easyhaler'),
    ('Nexthaler'),
    ('Twisthaler'),
    ('Breezhaler'),
    ('Respimat'),
    ('Evohaler'),
    ('Autohaler'),
    ('Genuair'),
    ('Aerosphere');


INSERT OR IGNORE INTO color (name) VALUES
    ('Valkoinen'),
    ('Pinkki'),
    ('Punainen'),
    ('Keltainen'),
    ('Oranssi'),
    ('Violetti'),
    ('Sininen'),
    ('Harmaa'),
    ('Ruskea'),
    ('Vihreä');


INSERT OR IGNORE INTO drug_form (name) VALUES
    ('jauhe'),
    ('jauhekapseli'),
    ('suihke'),
    ('suihke sisäänhengityksen laukaisema'),
    ('tilanjatkeella');


INSERT OR IGNORE INTO drug_class (name) VALUES
    ('ICS'),
    ('LAMA'),
    ('LABA'),
    ('SABA'),
    ('SAMA');

INSERT OR IGNORE INTO active_ingredient (name, drug_class_id) VALUES
    ('Beklometasoni', 1), -- ICS
    ('Budesonidi', 1),
    ('Flutikasonipropionaatti', 1),
    ('Flutikasonifuroaatti', 1),
    ('Mometasoni', 1),
    ('Siklesonidi', 1),

    ('Formoteroli', 3), -- LABA
    ('Salmeteroli', 3),
    ('Vilanteroli', 3),
    ('Indakateroli', 3),
    ('Olodateroli', 3),

    ('Tiotropiumbromidi', 2), -- LAMA
    ('Aklidiniumbromidi', 2),
    ('Glykopyrroniumbromidi', 2),
    ('Umeklinidiumbromidi', 2),

    ('Salbutamoli', 4), -- SABA
    ('Terbutaliini', 4);


