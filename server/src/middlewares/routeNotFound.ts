import { Request, Response } from "express";

const routeNotFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export default routeNotFound;
