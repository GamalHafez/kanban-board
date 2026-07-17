import { NextFunction, Request, Response } from "express";
import { prisma } from "@config/db.js";

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description } = req.body;

    const lastTask = await prisma.task.findFirst({
      where: {
        columnId: req.column!.id,
      },
      orderBy: {
        position: "desc",
      },
      select: {
        position: true,
      },
    });

    const nextPosition = lastTask ? lastTask.position + 1 : 0;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        position: nextPosition,
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

    res.status(201).json({
      success: true,
      data: { task },
    });
  } catch (err) {
    next(err);
  }
};
