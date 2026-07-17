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

export const createColumn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title } = req.body;

    const count = await prisma.column.count({
      where: {
        boardId: req.board!.id,
      },
    });

    const column = await prisma.column.create({
      data: {
        title,
        position: count + 1,
        boardId: req.board!.id,
      },
      select: {
        id: true,
        title: true,
        position: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      success: true,
      data: { column },
    });
  } catch (err) {
    next(err);
  }
};

export const updateColumn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title } = req.body;

    const column = await prisma.column.update({
      where: { id: req.column!.id },
      data: { title },
      select: {
        id: true,
        title: true,
        position: true,
        boardId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Column updated successfully",
      data: { column },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteColumn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const column = await prisma.column.delete({
      where: { id: req.column!.id },
      select: { title: true },
    });

    res.status(204).json({
      success: true,
      message: "Column deleted successfully",
      data: { column },
    });
  } catch (err) {
    next(err);
  }
};
