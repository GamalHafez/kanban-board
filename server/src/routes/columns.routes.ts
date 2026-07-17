import {
  getColumns,
  createColumn,
  updateColumn,
  deleteColumn,
} from "@/controllers/columns.controller.js";
import { checkColumnId, validateRequest } from "@/middlewares/index.js";
import { upsertColumnSchema } from "@shared/schemas/columns.validators.js";
import tasksRoutes from "@routes/tasks.routes.js";
import { Router } from "express";

const route = Router({ mergeParams: true });

route
  .route("/")
  .get(getColumns)
  .post(validateRequest(upsertColumnSchema), createColumn);

route.param("columnId", checkColumnId);
route
  .route("/:columnId")
  .patch(validateRequest(upsertColumnSchema), updateColumn)
  .delete(deleteColumn);

route.use("/:columnId/tasks", tasksRoutes);

export default route;
