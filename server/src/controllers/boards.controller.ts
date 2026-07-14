import { NextFunction, Request, Response } from "express";

export const getBoards = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ mess: "teeeeest" });
  } catch (err) {
    next(err);
  }
};
