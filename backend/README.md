# Backend

## API Endpoints
### Get All Inhalers:

**Endpoint** GET /api/inhalers/

    No parameters needed

### Create New Inhaler:
**Endpoint** POST /api/admin/inhalers/

Must have parameters:

    Field                   Type
    -------------------------------------
    name                    string

Optional parameters:

    Field                   Type
    -------------------------------------
    image_path              string
    links                   string
    official_min_age        int 
    recommended_min_age     int 
    times_a_day             int 
    good_intake_speed       0/1 (boolean)
    good_coordination       0/1 (boolean)
    treatment_medicine      0/1 (boolean)
    symptomatic_medicine    0/1 (boolean)
    inhaler_brand_id        int
    description             Object/JSON
    intake_styles           int[]
    active_ingredients      int[]
    colors                  int[]

Example JSON:
```
{
    name: "Medicine",
    image_path: "/this/dir",
    links: "inhalaattorit.fi",
    official_min_age: 1,
    recommended_min_age: 5,
    times_a_day: 1,
    good_intake_speed: 0,
    good_coordination: 1,
    treatment_medicine: 0,
    sympromaric_medicine: 1,
    inhaler_brand_id: 4,
    description: {
        fi: "Lääke",
        sv: "Lääke (ruotsiksi)"
    },
    intake_styles: [1, 2],
    active_ingredients: [3, 2],
    colors: [3, 7]
}
```

### Edit Existing Inhaler:
**Endpoint** PUT /api/admin/inhalers/{id}

Must have parameters:

    Field                   Type
    -------------------------------------
    -                       -

Optional parameters:

    Field                   Type
    -------------------------------------
    name                    string 
    image_path              string
    links                   string
    official_min_age        int 
    recommended_min_age     int 
    times_a_day             int 
    good_intake_speed       0/1 (boolean)
    good_coordination       0/1 (boolean)
    treatment_medicine      0/1 (boolean)
    symptomatic_medicine    0/1 (boolean)
    inhaler_brand_id        int
    description             Object/JSON
    intake_styles           int[]
    active_ingredients      int[]
    colors                  int[]

**Note:** When given array it only sets given ones. So if previously you had medicine with intake_styles: [1, 2, 3] and then want to add style 5, you need to give in JSON intake_styles: [1, 2, 3, 5].

Example JSON:

```
{
    image_path: /better/location
    times_a_day: 6,
    description: {
        fi: "Lääkkeeni"
    },
    intake_styles: [2],
    colors: [1, 8]
}
```

After edit medicine state is:
```
{
    id: 1, (automatically given)
    name: "Medicine",
    image_path: "/better/location",
    links: "inhalaattorit.fi",
    official_min_age: 1,
    recommended_min_age: 5,
    times_a_day: 6,
    good_intake_speed: 0,
    good_coordination: 1,
    treatment_medicine: 0,
    sympromaric_medicine: 1,
    inhaler_brand_id: 4,
    description: {
        fi: "Lääkeeni",
        sv: "Lääke (ruotsiksi)"
    },
    intake_styles: [2],
    active_ingredients: [3, 2],
    colors: [1, 8]
}
```

### Delete Existing Inhaler:
**Endpoint** DELETE /api/admin/inhalers/{id}

    No parameters needed
