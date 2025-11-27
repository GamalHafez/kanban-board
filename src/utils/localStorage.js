import defaultData from "@/data.json";
export const BOARDS_KEY = "boards";

export const loadBoards = () => {
  try {
    const stored = localStorage.getItem(BOARDS_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  } catch {
    return defaultData;
  }
};
