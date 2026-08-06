import { z } from "zod";

export const upsertColumnSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
});
