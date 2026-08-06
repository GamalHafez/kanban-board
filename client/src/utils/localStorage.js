export const APP_KEYS = {
  selectedBoardId: "selectedBoardId",
};

export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromStorage = (key, defaultData) => {
  const stored = localStorage.getItem(key);
  try {
    switch (key) {
      case APP_KEYS.selectedBoardId:
        return stored ? JSON.parse(stored) : defaultData;
      default:
        return defaultData;
    }
  } catch {
    return defaultData;
  }
};
