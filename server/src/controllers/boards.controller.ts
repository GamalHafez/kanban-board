import { NextFunction, Request, Response } from "express";
import { prisma } from "@config/db.js";
import { ColumnResponse } from "@/types/index.js";

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

    res.status(200).json({
      success: true,
      data: { boards },
    });
  } catch (err) {
    next(err);
  }
};

export const createBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, columns } = req.body;

    const board = await prisma.board.create({
      data: {
        name,
        user: {
          connect: { id: req.user?.id },
        },
        columns: {
          create: columns.map((c: ColumnResponse, index: number) => ({
            title: c.title,
            position: index,
          })),
        },
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      success: true,
      data: { board },
    });
  } catch (err) {
    next(err);
  }
};

export const getBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { board } = req;

    res.status(200).json({
      success: true,
      data: { board },
    });
  } catch (err) {
    next(err);
  }
};

export const updateBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, columns } = req.body;

    const board = await prisma.board.update({
      where: { id: req.board?.id },
      data: {
        name,
        columns: {
          deleteMany: {},
          create: columns.map((c: ColumnResponse, index: number) => ({
            title: c.title,
            position: index,
          })),
        },
      },
    });

    res.status(200).json({
      success: true,
      data: { board },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const board = await prisma.board.delete({
      where: { id: req.board?.id },
      select: { name: true },
    });

    res.status(200).json({
      success: true,
      message: "Board deleted successfully",
      data: { board },
    });
  } catch (err) {
    next(err);
  }
};
