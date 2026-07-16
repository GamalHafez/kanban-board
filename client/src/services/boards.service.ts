import { normalizeError } from "@/utils";
import { API_ENDPOINTS } from "./urls";

export type Board = {
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

export const createBoard = async (data: { name: string }): Promise<Board> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.BOARDS}`;

    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || "Failed to create board");
    }

    return res.data.board as Board;
  } catch (err) {
    throw normalizeError(err);
  }
};

export const updateBoard = async (id: string, name: string): Promise<Board> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.BOARDS}/${id}`;

    const response = await fetch(url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || res.error || "Failed to update board");
    }

    return res.data.board as Board;
  } catch (err) {
    throw normalizeError(err);
  }
};

export const deleteBoard = async (id: string): Promise<Board> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.BOARDS}/${id}`;

    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || res.error || "Failed to update board");
    }

    return res.data.board as Board;
  } catch (err) {
    throw normalizeError(err);
  }
};
