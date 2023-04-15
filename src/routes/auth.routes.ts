import express from "express";
import {
  loginUserController,
  refreshToken,
  registerUserController,
} from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { loginUserScheme, registerUserScheme } from "../schemas/user.schema";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  validate(registerUserScheme),
  registerUserController
);

authRouter.post("/login", validate(loginUserScheme), loginUserController);
authRouter.post("/refresh", refreshToken);
