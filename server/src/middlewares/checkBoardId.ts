import { Request, Response, NextFunction } from "express";
import { prisma } from "@config/db.js";

export const checkBoardId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const board = await prisma.board.findUnique({
      where: {
        id: id as string,
        userId: req.user?.id,
      },
    });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    req.boardId = id as string;
    next();
  } catch (err) {
    next(err);
  }
};
