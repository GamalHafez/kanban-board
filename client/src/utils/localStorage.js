export const APP_KEYS = {
  BOARDS: "boards",
  BOARD_IDX: "selectedBoardIndex",
};

export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromStorage = (key, defaultData) => {
  const stored = localStorage.getItem(key);
  try {
    switch (key) {
      case APP_KEYS.BOARDS:
        return stored ? JSON.parse(stored) : defaultData;
      case APP_KEYS.BOARD_IDX:
        return stored ? Number(stored) : defaultData;
      default:
        return defaultData;
    }
  } catch {
    return defaultData;
  }
};
