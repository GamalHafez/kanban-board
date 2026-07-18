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

const reorderedTaskSchema = z.object({
  id: z.uuid({
    message: "Invalid task id.",
  }),
  position: z
    .number()
    .int({ message: "Position must be an integer." })
    .min(0, { message: "Position must be greater than or equal to 0." }),
});

export const reorderTasksSchema = z.object({
  sourceColumnId: z.uuid({
    message: "Invalid source column id.",
  }),

  targetColumnId: z.uuid({
    message: "Invalid target column id.",
  }),

  sourceTasks: z
    .array(reorderedTaskSchema)
    .min(1, { message: "Source tasks cannot be empty." }),

  targetTasks: z
    .array(reorderedTaskSchema)
    .min(1, { message: "Target tasks cannot be empty." })
    .optional(),
});
