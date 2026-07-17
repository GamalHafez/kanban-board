import { UserResponse, BoardResponse, ColumnResponse } from "./index.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
      board?: BoardResponse;
      column?: ColumnResponse;
    }
  }
}
