import {
  UserResponse,
  BoardResponse,
  ColumnResponse,
  TaskResponse,
} from "./index.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
      board?: BoardResponse;
      column?: ColumnResponse;
      task?: TaskResponse;
    }
  }
}
