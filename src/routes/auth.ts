import express from "express";
import { AuthController } from "../controllers/auth-controller";
import { validateLogin, validateCode } from "../middlewares/validatorsMiddleware";

const authRouter = express.Router();

authRouter.post("/send-code", validateLogin, AuthController.sendCode);
authRouter.post("/verify-code", validateCode, AuthController.verifyCode);
authRouter.post("/login", validateLogin, AuthController.login);
authRouter.post("/forgot-password", AuthController.forgotPassword);
authRouter.post("/reset-password", AuthController.resetPassword);

export { authRouter };
