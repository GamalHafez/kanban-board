import { getColumns, createColumn } from "@/controllers/columns.controller.js";
import { checkColumnId } from "@/middlewares/index.js";
import { Router } from "express";

const route = Router({ mergeParams: true });

route.route("/").get(getColumns).post(createColumn);

route.param("columnId", checkColumnId);

export default route;
