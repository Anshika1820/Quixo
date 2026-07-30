
const BASE_URL = "http://localhost:8080/api/v1";

export async function search(query) {
    const response = await fetch(`${BASE_URL}/search?q=${query}`);

    if (!response.ok) {
        throw new Error("Failed to fetch search results");
    }

    return response.json();
}