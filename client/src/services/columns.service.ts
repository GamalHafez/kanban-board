import { normalizeError } from "@/utils";
import { API_ENDPOINTS } from "./urls";

export type Column = {
  id: string;
  title: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
};

export const getColumns = async (boardId: string): Promise<Column[]> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.BOARDS}/${boardId}/columns`;

    const response = await fetch(url, {
      credentials: "include",
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.error || res.message || "Can't get columns");
    }

    return res.data.columns;
  } catch (err) {
    throw normalizeError(err);
  }
};

export const createColumn = async (
  boardId: string,
  data: { title: string },
): Promise<Column> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.BOARDS}/${boardId}/columns`;

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
      throw new Error(res.message || "Failed to create column");
    }

    return res.data.column as Column;
  } catch (err) {
    throw normalizeError(err);
  }
};
