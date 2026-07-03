import { Router } from "express";
import { healthCheck } from "../controllers/app.controller.js";

const route = Router();

route.get("/", healthCheck);

export default route;
