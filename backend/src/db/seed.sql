 
INSERT OR IGNORE INTO inhaler_brand (name) VALUES
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


INSERT OR IGNORE INTO color (id) VALUES
    (1),(2),(3),(4),(5),(6),(7),(8),(9),(10);

INSERT OR IGNORE INTO color_translation (color_id, language, name) VALUES
    (1, 'fi', 'Valkoinen'),
    (2, 'fi', 'Pinkki'),
    (3, 'fi', 'Punainen'),
    (4, 'fi', 'Keltainen'),
    (5, 'fi', 'Oranssi'),
    (6, 'fi', 'Violetti'),
    (7, 'fi', 'Sininen'),
    (8, 'fi', 'Harmaa'),
    (9, 'fi', 'Ruskea'),
    (10, 'fi', 'Vihreä'),

    (1, 'sv', 'Vit'),
    (2, 'sv', 'Rosa'),
    (3, 'sv', 'Röd'),
    (4, 'sv', 'Gul'),
    (5, 'sv', 'Orange'),
    (6, 'sv', 'Lila'),
    (7, 'sv', 'Blå'),
    (8, 'sv', 'Grå'),
    (9, 'sv', 'Brun'),
    (10, 'sv', 'Grön');


INSERT OR IGNORE INTO intake_style (id) VALUES
    (1),(2),(3),(4),(5);
    

INSERT OR IGNORE INTO intake_style_translation (intake_style_id, language, name) VALUES
    (1, 'fi', 'Jauhe'),
    (2, 'fi', 'Jauhekapseli'),
    (3, 'fi', 'Suihke'),
    (4, 'fi', 'Suihke sisäänhengityksen laukaisemana'),
    (5, 'fi', 'Tilanjatkeella'),

    (1, 'sv', 'Pulverinhalator'),
    (2, 'sv', 'Pulverkapsel'),
    (3, 'sv', 'Drivgasaerosol'),
    (4, 'sv', 'Drivgasaerosol utlöses genom inandning'),
    (5, 'sv', 'Med inhalationsspacer');

INSERT OR IGNORE INTO drug_class (name) VALUES
    ('ICS'),
    ('LAMA'),
    ('LABA'),
    ('SABA'),
    ('SAMA');

INSERT OR IGNORE INTO active_ingredient (id, drug_class_id) VALUES
    (1, 1), -- ICS
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1),

    (7, 3), -- LABA
    (8, 3),
    (9, 3),
    (10, 3),
    (11, 3),

    (12, 2), -- LAMA
    (13, 2),
    (14, 2),
    (15, 2),

    (16, 4), -- SABA
    (17, 4);


INSERT OR IGNORE INTO active_ingredient_translation (active_ingredient_id, language, name) VALUES
    (1, 'fi', 'Beklometasoni'), -- ICS
    (2, 'fi', 'Budesonidi'),
    (3, 'fi', 'Flutikasonipropionaatti'),
    (4, 'fi', 'Flutikasonifuroaatti'),
    (5, 'fi', 'Mometasoni'),
    (6, 'fi', 'Siklesonidi'),

    (7, 'fi', 'Formoteroli'), -- LABA
    (8, 'fi', 'Salmeteroli'),
    (9, 'fi', 'Vilanteroli'),
    (10, 'fi', 'Indakateroli'),
    (11, 'fi', 'Olodateroli'),

    (12, 'fi', 'Tiotropiumbromidi'), -- LAMA
    (13, 'fi', 'Aklidiniumbromidi'),
    (14, 'fi', 'Glykopyrroniumbromidi'),
    (15, 'fi', 'Umeklinidiumbromidi'),

    (16, 'fi', 'Salbutamoli'), -- SABA
    (17, 'fi', 'Terbutaliini'),

    -- sve 
    (1, 'sv', 'Beklometason'), -- ICS
    (2, 'sv', 'Budesonid'),
    (3, 'sv', 'Flutikasonpropionat'),
    (4, 'sv', 'Flutikasonfuroat'),
    (5, 'sv', 'Mometason'),
    (6, 'sv', 'Ciklesonid'),

    (7, 'sv', 'Formoterol'), -- LABA
    (8, 'sv', 'Salmeterol'),
    (9, 'sv', 'Vilanterol'),
    (10, 'sv', 'Indakaterol'),
    (11, 'sv', 'Olodaterol'),

    (12, 'sv', 'Tiotropiumbromid'), -- LAMA
    (13, 'sv', 'Aklidiniumbromid'),
    (14, 'sv', 'Glykopyrroniumbromid'),
    (15, 'sv', 'Umeklinidiumbromid'),

    (16, 'sv', 'Salbutamol'), -- SABA
    (17, 'sv', 'Terbutalin');