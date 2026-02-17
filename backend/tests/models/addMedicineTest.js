const { dbAdd } = require("../../src/models/admin.model")

const testMedicine = {
    name: "Testilääke",
    image_path: "/on",
    description: "Tiedot",
    age_group_id: 1,
    dosage_id: 1,
    inhalation_requirement_id: 1,
    inhaler_id: 3
};

dbAdd(testMedicine);