import { NextFunction, Request, Response } from "express";
import { prisma } from "@config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "@utils/generateToken.js";

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
      return res
        .status(409)
        .json({ error: "User already exists with this email" });
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
