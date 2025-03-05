import express from "express";
import { AuthController } from "../controllers/auth-controller";
import { ensureEmailVerified, sendVerificationCode } from "../middlewares/verifyEmailMiddleware";

const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/verify-email", sendVerificationCode, AuthController.verifyEmail);
authRouter.post("/recover-password", ensureEmailVerified, AuthController.recoverPassword);

export { authRouter };
