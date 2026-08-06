import { Request, Response, NextFunction } from "express";
import { prisma } from "@config/db.js";

export const checkBoardId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { boardId } = req.params;

    const board = await prisma.board.findUnique({
      where: {
        id: boardId as string,
        userId: req.user?.id,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        columns: {
          orderBy: {
            position: "asc",
          },
          include: {
            tasks: {
              orderBy: {
                position: "asc",
              },
            },
          },
        },
      },
    });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Board not found",
      });
    }

    req.board = board;
    next();
  } catch (err) {
    next(err);
  }
};
