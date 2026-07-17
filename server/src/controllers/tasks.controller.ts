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

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description } = req.body;

    const task = await prisma.task.update({
      where: { id: req.task!.id },
      data: { title, description },
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: { task },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const task = await prisma.task.delete({
      where: { id: req.task!.id },
      select: { title: true, description: true },
    });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: { task },
    });
  } catch (err) {
    next(err);
  }
};
