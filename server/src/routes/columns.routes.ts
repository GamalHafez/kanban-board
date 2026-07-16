import { getColumns } from "@/controllers/columns.controller.js";
import { Router } from "express";

const route = Router({ mergeParams: true });

route.route("/").get(getColumns);

export default route;
