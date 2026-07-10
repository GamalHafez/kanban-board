import z from "zod";
// @ts-expect-error
import { signUpSchema } from "@shared/schemas/auth.validators";
// @ts-expect-error
import { API_ENDPOINTS } from "@/services/urls.js";
import { normalizeError } from "@utils";

type UserPayload = z.infer<typeof signUpSchema>;

type UserResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const createUser = async (data: UserPayload): Promise<UserResponse> => {
  const url = `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.SIGN_UP}`;

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.error || "Failed to create user");
    }

    return res.data.user as UserResponse;
  } catch (err) {
    throw normalizeError(err);
  }
};

const getCurrentUser = async (): Promise<UserResponse> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.GET_ME}`;

    const response: Response = await fetch(url, {
      credentials: "include",
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.error || "Unauthorized");
    }

    return res.data.user as UserResponse;
  } catch (err) {
    throw normalizeError(err);
  }
};

export const checkAuth = async (
  setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>,
) => {
  try {
    const user = await getCurrentUser();
    setUser(user);
  } catch (err) {
    setUser(null);
  }
};
