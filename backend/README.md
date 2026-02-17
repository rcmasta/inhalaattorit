# Backend

## API Endpoints
### Get All Inhalers:

**Endpoint** GET /api/inhalers/

    No parameters needed

### Create New Inhaler:
**Endpoint** POST /api/admin/inhalers/

Must have parameters:

    Field                   Type
    -------------------------------
    name                    string

Optional parameters:

    Field                   Type
    -------------------------------
    image_path              string 
    description             string 
    official_min_age        int 
    recommended_min_age     int 
    times_a_day             int 
    good_intake_speed       boolean
    good_coordination       boolean
    treatment_medicine      boolean
    symptomatic_medicine    boolean
    inhaler_brand           string      !! not implemented
    drug_class              string[]    !! not implemented
    color                   string[]    !! not implemented

### Edit Existing Inhaler:
**Endpoint** PUT /api/admin/inhalers/{id}

Must have parameters:

    Field                   Type
    -------------------------------
    -                       -

Optional parameters:

    Field                   Type
    -------------------------------
    name                    string 
    image_path              string
    description             string
    official_min_age        int 
    recommended_min_age     int 
    times_a_day             int 
    good_intake_speed       boolean
    good_coordination       boolean
    treatment_medicine      boolean
    symptomatic_medicine    boolean
    inhaler_brand           string      !! not implemented
    drug_class              string[]    !! not impelemeted
    color                   string[]    !! not implemented

### Delete Existing Inhaler:
**Endpoint** DELETE /api/admin/inhalers/{id}

    No parameters needed

**Note** currently cannot remove items with inhaler_brand, drug_class or color, it will fail