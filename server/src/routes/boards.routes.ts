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
import { upsertBoardSchema } from "@shared/schemas/boards.validators.js";

const route = Router();
route.use(verifyJwt);

route
  .route("/")
  .get(getBoards)
  .post(validateRequest(upsertBoardSchema), createBoard);

route.param("id", checkBoardId);
route.route("/:id").patch(validateRequest(upsertBoardSchema), updateBoard);

export default route;
