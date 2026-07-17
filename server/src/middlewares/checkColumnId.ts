import { Request, Response, NextFunction } from "express";
import { prisma } from "@config/db.js";

export const checkColumnId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { columnId } = req.params;

    const column = await prisma.column.findUnique({
      where: {
        id: columnId as string,
      },
      select: {
        id: true,
        title: true,
        position: true,
        boardId: true,
        createdAt: true,
        updatedAt: true,
        tasks: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    if (!column) {
      return res.status(404).json({
        success: false,
        message: "Column not found",
      });
    }

    req.column = column;
    next();
  } catch (err) {
    next(err);
  }
};
