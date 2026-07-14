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

export const createBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;

    const board = await prisma.board.create({
      data: {
        name,
        user: {
          connect: { id: req.user?.id },
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

export const updateBoard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name } = req.body;
    const { boardId } = req;

    const board = await prisma.board.update({
      where: { id: boardId },
      data: { name },
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
    const { boardId } = req;

    const board = await prisma.board.delete({
      where: { id: boardId },
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
