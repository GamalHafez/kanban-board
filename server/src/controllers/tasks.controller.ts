import { NextFunction, Request, Response } from "express";
import { prisma } from "@config/db.js";
import { TaskResponse } from "@/types/index.js";

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

export const reorderTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sourceColumnId, targetColumnId, sourceTasks, targetTasks } =
      req.body;

    // Ensure both columns belong to the current board
    const columns = await prisma.column.findMany({
      where: {
        id: {
          in: [sourceColumnId, targetColumnId],
        },
        boardId: req.board!.id,
      },
      select: { id: true },
    });

    if (columns.length !== (sourceColumnId === targetColumnId ? 1 : 2)) {
      return res.status(404).json({
        success: false,
        message: "Column not found.",
      });
    }

    if (sourceColumnId === targetColumnId) {
      await prisma.$transaction(async (tx) => {
        // Phase 1
        for (const task of sourceTasks) {
          await tx.task.update({
            where: { id: task.id },
            data: {
              position: -(task.position + 1),
            },
          });
        }

        // Phase 2
        for (const task of sourceTasks) {
          await tx.task.update({
            where: { id: task.id },
            data: {
              position: task.position,
            },
          });
        }
      });
    } else {
      await prisma.$transaction([
        ...sourceTasks.map((task: TaskResponse, index: number) =>
          prisma.task.update({
            where: { id: task.id },
            data: {
              columnId: sourceColumnId,
              position: -(index + 1), // temporary unique positions
            },
          }),
        ),

        ...targetTasks.map((task: TaskResponse, index: number) =>
          prisma.task.update({
            where: { id: task.id },
            data: {
              columnId: targetColumnId,
              position: -(index + 1000), // different temporary range
            },
          }),
        ),
      ]);
      await prisma.$transaction([
        ...sourceTasks.map((task: TaskResponse) =>
          prisma.task.update({
            where: { id: task.id },
            data: {
              columnId: sourceColumnId,
              position: task.position,
            },
          }),
        ),

        ...targetTasks.map((task: TaskResponse) =>
          prisma.task.update({
            where: { id: task.id },
            data: {
              columnId: targetColumnId,
              position: task.position,
            },
          }),
        ),
      ]);
    }

    res.status(200).json({
      success: true,
      message: "Tasks reordered successfully.",
    });
  } catch (err) {
    next(err);
  }
};
