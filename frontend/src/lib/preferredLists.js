const STORAGE_KEY = "quixo_preferred_lists";

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getPreferredLists() {
  if (typeof window === "undefined") return [];

  try {
    const storedLists = localStorage.getItem(STORAGE_KEY);

    if (!storedLists) return [];

    const parsedLists = JSON.parse(storedLists);
    return Array.isArray(parsedLists) ? parsedLists : [];
  } catch (error) {
    console.error("Could not load Preferred Lists:", error);
    return [];
  }
}

function savePreferredLists(lists) {
  if (typeof window === "undefined") return false;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    return true;
  } catch (error) {
    console.error("Could not save Preferred Lists:", error);
    return false;
  }
}

export function createPreferredList(name) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return { success: false, message: "Enter a list name." };
  }

  const lists = getPreferredLists();

  const alreadyExists = lists.some(
    (list) => list.name.toLowerCase() === trimmedName.toLowerCase()
  );

  if (alreadyExists) {
    return { success: false, message: "A list with that name already exists." };
  }

  const newList = {
    id: createId(),
    name: trimmedName,
    items: [],
    createdAt: new Date().toISOString(),
  };

  if (!savePreferredLists([...lists, newList])) {
    return { success: false, message: "Could not save the list." };
  }

  return { success: true, list: newList };
}

export function addResultToPreferredList(listId, result, query = "", mode = "EXPLORE") {
  const lists = getPreferredLists();
  const targetList = lists.find((list) => list.id === listId);

  if (!targetList) {
    return { success: false, message: "List not found." };
  }

  if (!result?.link || !result?.title) {
    return { success: false, message: "This result cannot be saved." };
  }

  const alreadySaved = targetList.items.some(
    (item) => item.link === result.link
  );

  if (alreadySaved) {
    return { success: false, message: "This result is already in that list." };
  }

  const savedItem = {
    id: createId(),
    title: result.title,
    link: result.link,
    snippet: result.snippet || "",
    source: result.source || "",
    sourceType: result.sourceType || "",
    image: result.image || "",
    date: result.date || "",
    query,
    mode,
    savedAt: new Date().toISOString(),
  };

  const updatedLists = lists.map((list) =>
    list.id === listId
      ? { ...list, items: [...list.items, savedItem] }
      : list
  );

  if (!savePreferredLists(updatedLists)) {
    return { success: false, message: "Could not save this result." };
  }

  return { success: true, item: savedItem };
}

export function removeSavedResult(listId, itemId) {
  const lists = getPreferredLists();

  const updatedLists = lists.map((list) =>
    list.id === listId
      ? {
          ...list,
          items: list.items.filter((item) => item.id !== itemId),
        }
      : list
  );

  return savePreferredLists(updatedLists);
}

export function deletePreferredList(listId) {
  const lists = getPreferredLists();
  const updatedLists = lists.filter((list) => list.id !== listId);

  return savePreferredLists(updatedLists);
}

