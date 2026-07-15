import { normalizeError } from "@/utils";
import { API_ENDPOINTS } from "./urls";

type Board = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const getBoards = async (): Promise<Board[]> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.BOARDS}`;

    const response = await fetch(url, {
      credentials: "include",
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.error || res.message || "Can't get boards");
    }

    return res.data.boards;
  } catch (err) {
    throw normalizeError(err);
  }
};
