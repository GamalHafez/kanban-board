import { Router } from "express";
import {
  validateRequest,
  verifyJwt,
  checkBoardId,
} from "@/middlewares/index.js";
import {
  getBoards,
  createBoard,
  updateBoard,
} from "@/controllers/boards.controller.js";
import { createBoardSchema } from "@shared/schemas/boards.validators.js";

const route = Router();
route.use(verifyJwt);

route
  .route("/")
  .get(getBoards)
  .post(validateRequest(createBoardSchema), createBoard);

route.param("id", checkBoardId);
route.route("/:id").patch(updateBoard);

export default route;
