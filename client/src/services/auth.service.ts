import z from "zod";
// @ts-expect-error
import { signUpSchema } from "@shared/schemas/auth.validators";
// @ts-expect-error
import { API_ENDPOINTS } from "@/api/urls.js";

type UserPayload = z.infer<typeof signUpSchema>;

type UserResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export const createUser = async (
  data: UserPayload,
): Promise<{ user: UserResponse }> => {
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

    return { user: res.data as UserResponse };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};
