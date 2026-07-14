import { Router } from "express";
import { validateRequest, verifyJwt } from "@/middlewares/index.js";
import { getBoards, createBoard } from "@/controllers/boards.controller.js";
import { createBoardSchema } from "@shared/schemas/boards.validators.js";

const route = Router();
route.use(verifyJwt);

route
  .route("/")
  .get(getBoards)
  .post(validateRequest(createBoardSchema), createBoard);

export default route;
