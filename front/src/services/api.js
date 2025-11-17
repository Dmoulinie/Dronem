export const API_URL = "http://localhost:8080/api";

export async function getAllDrones() {
    const response = await fetch(`${API_URL}/drones/getDrones`);
    console.log(response)
    if (!response.ok) throw new Error("Erreur API");
    return response.json();
}
