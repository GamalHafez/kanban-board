import {
  getColumns,
  createColumn,
  updateColumn,
} from "@/controllers/columns.controller.js";
import { checkColumnId, validateRequest } from "@/middlewares/index.js";
import { upsertColumnSchema } from "@shared/schemas/columns.validators.js";
import { Router } from "express";

const route = Router({ mergeParams: true });

route
  .route("/")
  .get(getColumns)
  .post(validateRequest(upsertColumnSchema), createColumn);

route.param("columnId", checkColumnId);
route
  .route("/:columnId")
  .patch(validateRequest(upsertColumnSchema), updateColumn);

export default route;
