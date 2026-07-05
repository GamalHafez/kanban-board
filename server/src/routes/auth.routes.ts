import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { signUpSchema } from "../validators/auth.validators.js";

const route = Router();

route.post("/signup", validateRequest(signUpSchema), signUp);

export default route;
