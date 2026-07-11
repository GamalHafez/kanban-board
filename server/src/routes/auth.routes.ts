import { Router } from "express";
import {
  getCurrentUser,
  signUp,
  login,
  logout,
} from "@controllers/auth.controller.js";
import { validateRequest } from "@middlewares/validateRequest.js";
import { signUpSchema, loginSchema } from "@shared/schemas/auth.validators.js";

const route = Router();

route.get("/me", getCurrentUser);
route.post("/signup", validateRequest(signUpSchema), signUp);
route.post("/login", validateRequest(loginSchema), login);
route.post("/logout", logout);

export default route;
