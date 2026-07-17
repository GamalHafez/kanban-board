import { upsertTaskSchema } from "@shared/schemas/tasks.validtors.js";
import { validateRequest } from "@/middlewares/validateRequest.js";
import { Router } from "express";
import { createTask } from "@/controllers/tasks.controller.js";
import { checkTaskId } from "@/middlewares/checkTaskId.js";

const route = Router({ mergeParams: true });

route.route("/").post(validateRequest(upsertTaskSchema), createTask);

route.param("taskId", checkTaskId);

export default route;
