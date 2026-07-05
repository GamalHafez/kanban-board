import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validateRequest = <T>(schema: ZodType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing",
      });
    }

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues.map((issue) => issue.message).join(", "),
      });
    }

    req.body = result.data;

    next();
  };
};
