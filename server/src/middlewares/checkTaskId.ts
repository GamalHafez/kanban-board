import { Request, Response, NextFunction } from "express";
import { prisma } from "@config/db.js";

export const checkTaskId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { taskId } = req.params;

    const task = await prisma.task.findUnique({
      where: {
        id: taskId as string,
        columnId: req.column!.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        position: true,
        columnId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    req.task = task;
    next();
  } catch (err) {
    next(err);
  }
};
