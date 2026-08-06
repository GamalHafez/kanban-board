import { Router } from "express";
import {
  getCurrentUser,
  signUp,
  login,
  logout,
} from "@controllers/auth.controller.js";
import { signUpSchema, loginSchema } from "@shared/schemas/auth.validators.js";
import { verifyJwt, validateRequest } from "@/middlewares/index.js";

const route = Router();

route.get("/me", verifyJwt, getCurrentUser);
route.post("/signup", validateRequest(signUpSchema), signUp);
route.post("/login", validateRequest(loginSchema), login);
route.post("/logout", logout);

export default route;
