import { NextFunction, Request, Response } from "express";
import { prisma } from "@config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "@utils/generateToken.js";

export const getCurrentUser = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password: userInputPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(userInputPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    generateToken(user.id, res);

    const { password, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: { user: safeUser },
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
