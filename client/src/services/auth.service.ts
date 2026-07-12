import z from "zod";
import { loginSchema, signUpSchema } from "@shared/schemas/auth.validators";
import { API_ENDPOINTS } from "@/services/urls.js";
import { normalizeError } from "@/utils";

type SignupPayload = z.infer<typeof signUpSchema>;
type LoginPayload = z.infer<typeof loginSchema>;

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const createUser = async (
  data: SignupPayload,
): Promise<UserResponse> => {
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

export const login = async (data: LoginPayload): Promise<UserResponse> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.LOG_IN}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.error || "Failed to log in");
    }

    return res.data.user;
  } catch (err) {
    throw normalizeError(err);
  }
};

export const logout = async (): Promise<string> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}${API_ENDPOINTS.LOG_OUT}`;

    const response: Response = await fetch(url, {
      method: "POST",
      credentials: "include",
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.error || "Failed to log out");
    }

    return res.message;
  } catch (err) {
    throw normalizeError(err);
  }
};
