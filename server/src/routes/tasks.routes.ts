import {
  reorderTasksSchema,
  upsertTaskSchema,
} from "@shared/schemas/tasks.validtors.js";
import { validateRequest } from "@/middlewares/validateRequest.js";
import { Router } from "express";
import {
  createTask,
  deleteTask,
  updateTask,
  reorderTasks,
} from "@/controllers/tasks.controller.js";
import { checkTaskId } from "@/middlewares/checkTaskId.js";

const route = Router({ mergeParams: true });

route.route("/").post(validateRequest(upsertTaskSchema), createTask);

route.patch("/reorder", validateRequest(reorderTasksSchema), reorderTasks);

route.param("taskId", checkTaskId);
route
  .route("/:taskId")
  .patch(validateRequest(upsertTaskSchema), updateTask)
  .delete(deleteTask);

export default route;
