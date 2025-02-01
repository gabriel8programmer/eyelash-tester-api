import express from "express";
import { usersController } from "../controllers/users-controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const userRouter = express.Router();

userRouter.get("/", AuthMiddleware.ensureAuth, AuthMiddleware.ensureIsAdmin, usersController.index);
userRouter.get(
  "/:id",
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  usersController.show
);
userRouter.post(
  "/",
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  usersController.create
);
userRouter.put(
  "/:id",
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  usersController.update
);
userRouter.delete(
  "/:id",
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  usersController.delete
);

export { userRouter };
