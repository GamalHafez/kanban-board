import { normalizeError } from "@/utils";
import { API_ENDPOINTS } from "./urls";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  position: number;
  createdAt: Date;
  updatedAt: Date;
};

export const createTask = async (
  boardId: string,
  columnId: string,
  data: { title: string; description?: string },
): Promise<Task> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.BOARDS}/${boardId}/columns/${columnId}/tasks`;

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
      throw new Error(res.message || "Failed to create task");
    }

    return res.data.task as Task;
  } catch (err) {
    throw normalizeError(err);
  }
};

export const updateTaskService = async (
  boardId: string,
  columnId: string,
  taskId: string,
  title: string,
  description?: string,
): Promise<Task> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`;

    const response = await fetch(url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || res.error || "Failed to update task");
    }

    return res.data.task as Task;
  } catch (err) {
    throw normalizeError(err);
  }
};
