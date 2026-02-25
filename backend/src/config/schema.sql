CREATE TABLE drug_class (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE inhaler_brand (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE medicine (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    image_path TEXT,
    links TEXT,

    official_min_age INTEGER,
    recommended_min_age INTEGER,
    times_a_day INTEGER,
    good_intake_speed BOOLEAN,
    good_coordination BOOLEAN,
    treatment_medicine BOOLEAN,
    symptomatic_medicine BOOLEAN,

    inhaler_brand_id INTEGER,
    FOREIGN KEY (inhaler_brand_id) REFERENCES inhaler_brand(id) ON DELETE RESTRICT
);

-- description translations
CREATE TABLE medicine_translation (
    medicine_id INTEGER NOT NULL,
    language TEXT NOT NULL,
    description TEXT,
    
    PRIMARY KEY (medicine_id, language),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id) ON DELETE CASCADE
);

-- intake style stuff
CREATE TABLE intake_style (
    id INTEGER PRIMARY KEY
);

CREATE TABLE medicine_intake_style (
    medicine_id INTEGER,
    intake_style_id INTEGER,
    PRIMARY KEY (medicine_id, intake_style_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id) ON DELETE CASCADE,
    FOREIGN KEY (intake_style_id) REFERENCES intake_style(id) ON DELETE RESTRICT
);

CREATE TABLE intake_style_translation (
    intake_style_id INTEGER NOT NULL,
    language TEXT NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY (intake_style_id, language),
    FOREIGN KEY (intake_style_id) REFERENCES intake_style(id)
);

-- active ingredient stuff

CREATE TABLE active_ingredient (
    id INTEGER PRIMARY KEY,

    drug_class_id INTEGER NOT NULL,
    FOREIGN KEY (drug_class_id) REFERENCES drug_class(id) ON DELETE RESTRICT
);

CREATE TABLE medicine_active_ingredient (
    medicine_id INTEGER,
    active_ingredient_id INTEGER,
    PRIMARY KEY (medicine_id, active_ingredient_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id) ON DELETE CASCADE,
    FOREIGN KEY (active_ingredient_id) REFERENCES active_ingredient(id) ON DELETE RESTRICT
);

CREATE TABLE active_ingredient_translation (
    active_ingredient_id INTEGER NOT NULL,
    language TEXT NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY (active_ingredient_id, language),
    FOREIGN KEY (active_ingredient_id) REFERENCES active_ingredient(id)
);



-- color stuff
CREATE TABLE color (
    id INTEGER PRIMARY KEY
);

CREATE TABLE medicine_color (
    medicine_id INTEGER,
    color_id INTEGER,
    PRIMARY KEY (medicine_id, color_id),
    FOREIGN KEY (medicine_id) REFERENCES medicine(id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES color(id) ON DELETE RESTRICT
);

CREATE TABLE color_translation (
    color_id INTEGER NOT NULL,
    language TEXT NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY (color_id, language),
    FOREIGN KEY (color_id) REFERENCES color(id)
);

