import { UserResponse, BoardResponse } from "./index.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
      board?: BoardResponse;
    }
  }
}
