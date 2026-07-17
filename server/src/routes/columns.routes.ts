import { getColumns, createColumn } from "@/controllers/columns.controller.js";
import { Router } from "express";

const route = Router({ mergeParams: true });

route.route("/").get(getColumns).post(createColumn);

export default route;
