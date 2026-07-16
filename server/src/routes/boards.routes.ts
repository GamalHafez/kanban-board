import { Router } from "express";
import {
  validateRequest,
  verifyJwt,
  checkBoardId,
} from "@/middlewares/index.js";
import {
  getBoards,
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
} from "@/controllers/boards.controller.js";
import { upsertBoardSchema } from "@shared/schemas/boards.validators.js";
import columnsRoutes from "@routes/columns.routes.js";

const route = Router();
route.use(verifyJwt);

route
  .route("/")
  .get(getBoards)
  .post(validateRequest(upsertBoardSchema), createBoard);

route.param("boardId", checkBoardId);
route
  .route("/:boardId")
  .get(getBoard)
  .patch(validateRequest(upsertBoardSchema), updateBoard)
  .delete(deleteBoard);

route.use("/:boardId/columns", columnsRoutes);

export default route;
