import { NextFunction, Request, Response } from "express";
import { prisma } from "@config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "@utils/generateToken.js";
import jwt, { JwtPayload } from "jsonwebtoken";

type MyJwtPayload = JwtPayload & {
  id: string;
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies["jwt"];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: "No auth cookie found",
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, secret) as MyJwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
    });
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "User already exists with this email",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // generate a token
    generateToken(user.id, res);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (_: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
