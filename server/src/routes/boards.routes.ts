import { Router } from "express";
import { verifyJwt } from "@/middlewares/index.js";
import { getBoards } from "@/controllers/boards.controller.js";

const route = Router();
route.use(verifyJwt);

route.route("/").get(getBoards);

export default route;
