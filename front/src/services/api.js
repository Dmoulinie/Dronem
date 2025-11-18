export const API_URL = "http://localhost:8080/api";

export async function getAllDrones() {
    const response = await fetch(`${API_URL}/drones/getDrones`);
    console.log(response)
    if (!response.ok) throw new Error("Erreur API");
    return response.json();
}

export async function getDroneById(id) {
    const response = await fetch(`${API_URL}/drones/getDroneById/${id}`);
    console.log(response)
    if (!response.ok) throw new Error("Erreur API");
    return response.json();
}


export async function getCartByUserId(id) {
    const response = await fetch(`${API_URL}/carts/getCartById/${id}`);

    if (!response.ok) {
        throw new Error("Erreur API lors de la récupération du panier");
    }

    return response.json();
}


// ---------------------- AUTH -------------------------
export async function loginUser(username, password) {
    const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.error || "Erreur de connexion");
    }

    return json; // retournera { user, token }
}

export async function registerUser(data) {
    const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.error || "Erreur d'inscription");
    }

    return json; // retournera { user, token }
}


export async function addToCart(userId, droneId, delta) {
    const res = await fetch(`${API_URL}/carts/addToCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id_user: userId,
            id_drone: droneId,
            delta: delta
        }),
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.error || "Erreur lors de l’ajout/suppression au panier");
    }

    return json;
}


export async function removeFromCart(userId, droneId) {
    const res = await fetch(`${API_URL}/carts/removeFromCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id_user: userId,
            id_drone: droneId,
        }),
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.error || "Erreur lors de l’ajout/suppression au panier");
    }

    return json;
}

