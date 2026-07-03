import { Request, Response } from "express";

export const healthCheck = (_: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Kanban API is running",
  });
};
