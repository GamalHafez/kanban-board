import { NextFunction, Request, Response } from "express";
import { prisma } from "@config/db.js";

export const getColumns = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const columns = await prisma.column.findMany({
      where: { boardId: req.board?.id },
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
    });

    res.status(200).json({
      success: true,
      data: { columns },
    });
  } catch (err) {
    next(err);
  }
};
