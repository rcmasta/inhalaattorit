// auth: login, get token, store in localStorage, send with every admin request

const API_URL = "http://localhost:3000";

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("admin-token")
    };
}

// 401 = token expired or invalid, clear and reload to login
function checkExpiredToken(res) {
    if (res.status === 401) {
        localStorage.removeItem("admin-token");
        alert("Istunto vanhentunut, kirjaudu uudelleen.");
        location.reload();
        return true;
    }
    return false;
}

// try to get error message from response body
async function getErrorMsg(res) {
    try {
        const body = await res.json();
        return body.message || "Tuntematon virhe";
    } catch (e) {
        return "Tuntematon virhe";
    }
}

// POST /api/admin/login - returns token or null
export async function adminLogin(username, password) {
    try {
        const res = await fetch(API_URL + "/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.token || null;
    } catch (e) {
        alert("Kirjautuminen epäonnistui. Tarkista yhteys.");
        return null;
    }
}

// GET /api/inhalers - returns array of inhalers
// Passes current language so backend can return translated data
export async function getInhalers() {
    try {
        const lang = localStorage.getItem("lang") || "fi";
        const res = await fetch(API_URL + "/api/inhalers?lang=" + lang);
        if (!res.ok) return [];
        return await res.json();
    } catch (e) {
        console.error("Failed to fetch inhalers:", e);
        return [];
    }
}

// POST /api/admin/inhalers - returns true/false
export async function createInhaler(data) {
    try {
        const res = await fetch(API_URL + "/api/admin/inhalers", {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (checkExpiredToken(res)) return false;
        if (!res.ok) {
            alert("Tallennus epäonnistui: " + await getErrorMsg(res));
            return false;
        }
        return true;
    } catch (e) {
        alert("Yhteysvirhe tallennuksessa.");
        return false;
    }
}

// PUT /api/admin/inhalers/:id - returns true/false
export async function updateInhaler(id, data) {
    try {
        const res = await fetch(API_URL + "/api/admin/inhalers/" + id, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (checkExpiredToken(res)) return false;
        if (!res.ok) {
            alert("Muokkaus epäonnistui: " + await getErrorMsg(res));
            return false;
        }
        return true;
    } catch (e) {
        alert("Yhteysvirhe muokkauksessa.");
        return false;
    }
}

// DELETE /api/admin/inhalers/:id - returns true/false
export async function deleteInhaler(id) {
    try {
        const res = await fetch(API_URL + "/api/admin/inhalers/" + id, {
            method: "DELETE",
            headers: getAuthHeaders()
        });
        if (checkExpiredToken(res)) return false;
        if (!res.ok) {
            alert("Poisto epäonnistui: " + await getErrorMsg(res));
            return false;
        }
        return true;
    } catch (e) {
        alert("Yhteysvirhe poistossa.");
        return false;
    }
}
