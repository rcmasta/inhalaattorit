// auth: login, get token, store in localStorage, send with every admin request

const API_URL = "http://localhost:3000";

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("admin-token")
    };
}

// --- frontend calls these ---
// TODO: replace mock calls with real fetch when backend is ready

// POST /api/admin/login - returns token or null
async function adminLogin(username, password) {
    return mockLogin(username, password);
}

// GET /api/user/ - returns array of inhalers
async function getInhalers() {
    return mockGetInhalers();
}

// POST /api/admin/inhalers/ - returns created inhaler or null
async function createInhaler(data) {
    return mockCreateInhaler(data);
}

// PUT /api/admin/inhalers/:id - returns updated inhaler or null
async function updateInhaler(id, data) {
    return mockUpdateInhaler(id, data);
}

// DELETE /api/admin/inhalers/:id - returns true/false
async function deleteInhaler(id) {
    return mockDeleteInhaler(id);
}

// --- mock stuff, remove when backend is ready ---

const mockInhalers = [
    {
        id: 1,
        name: "Inhalaattori 1",
        form: "Lääkemuoto 1",
        age: "Ikä 1",
        dosage: "Annostelu 1",
        velocity: "Nopeus 1",
        coordination: "Koordinaatio 1",
        device: "Inhalaattori 1",
        purpose: "Tarkoitus 1",
        drugGroup: "Ryhmä 1",
        substance: "Lääkeaine 1",
        color: "Väri 1"
    },
    {
        id: 2,
        name: "Inhalaattori 2",
        form: "Lääkemuoto 2",
        age: "Ikä 2",
        dosage: "Annostelu 2",
        velocity: "Nopeus 2",
        coordination: "Koordinaatio 2",
        device: "Inhalaattori 2",
        purpose: "Tarkoitus 2",
        drugGroup: "Ryhmä 2",
        substance: "Lääkeaine 2",
        color: "Väri 2"
    },
    {
        id: 3,
        name: "Inhalaattori erittäin pitkä nimi esimerkki testaamista varten",
        form: "Lääkemuoto erittäin pitkä vaihtoehto esimerkki",
        age: "Ikä 3",
        dosage: "Annostelu 3",
        velocity: "Nopeus 1",
        coordination: "Koordinaatio 1",
        device: "Inhalaattori 3",
        purpose: "Tarkoitus erittäin pitkä vaihtoehto esimerkki",
        drugGroup: "Ryhmä 3",
        substance: "Vaikuttava lääkeaine erittäin pitkä nimi esimerkki testaamista varten",
        color: "Väri 3"
    }
];
let mockNextId = 4;

function mockLogin(username, password) {
    if (username === "admin" && password === "admin") {
        return "placeholder-token";
    }
    return null;
}

function mockGetInhalers() {
    return [...mockInhalers];
}

function mockCreateInhaler(data) {
    const newInhaler = { id: mockNextId++, ...data };
    mockInhalers.push(newInhaler);
    return newInhaler;
}

function mockUpdateInhaler(id, data) {
    const index = mockInhalers.findIndex(i => i.id === id);
    if (index === -1) return null;
    mockInhalers[index] = { id, ...data };
    return mockInhalers[index];
}

function mockDeleteInhaler(id) {
    const index = mockInhalers.findIndex(i => i.id === id);
    if (index === -1) return false;
    mockInhalers.splice(index, 1);
    return true;
}
