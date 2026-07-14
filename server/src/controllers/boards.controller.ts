import { NextFunction, Request, Response } from "express";
import { prisma } from "@config/db.js";

export const getBoards = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const boards = await prisma.board.findMany({
      where: { userId: req.user?.id },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: { boards },
    });
  } catch (err) {
    next(err);
  }
};
