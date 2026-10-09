const BASE_URL = "/api/v1";

export async function search(query, mode = "EXPLORE") {
  const trimmedQuery = query?.trim();

  if (!trimmedQuery) {
    throw new Error("Please enter a search query.");
  }

  const params = new URLSearchParams({
    q: trimmedQuery,
    mode,
  });

  let response;

  try {
    response = await fetch(`${BASE_URL}/search?${params.toString()}`);
  } catch {
    throw new Error(
      "Unable to connect to Quixo. Please check that the backend is running."
    );
  }

  if (!response.ok) {
    let message = "Search failed. Please try again.";

    try {
      const errorData = await response.json();
      message = errorData.message || errorData.error || message;
    } catch {
      // Keep the default message if the response isn't JSON.
    }

    throw new Error(message);
  }

  return response.json();
}
