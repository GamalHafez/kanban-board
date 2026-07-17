import { z } from "zod";

export const upsertTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .max(50, { message: "Name cannot exceed 50 characters." }),

  description: z
    .string()
    .trim()
    .max(500, { message: "Description cannot exceed 500 characters" })
    .optional(),
});
