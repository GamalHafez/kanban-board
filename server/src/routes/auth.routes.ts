import { Router } from "express";
import { signUp, getCurrentUser } from "@controllers/auth.controller.js";
import { validateRequest } from "@middlewares/validateRequest.js";
import { signUpSchema } from "@shared/schemas/auth.validators.js";

const route = Router();

route.get("/me", getCurrentUser);
route.post("/signup", validateRequest(signUpSchema), signUp);

export default route;
