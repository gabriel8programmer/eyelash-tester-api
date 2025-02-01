import express from "express";
import { UsersController } from "../controllers/users-controller";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const userRouter = express.Router();

userRouter.get("/", AuthMiddleware.ensureAuth, AuthMiddleware.ensureIsAdmin, UsersController.index);
userRouter.get(
  "/:id",
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  UsersController.show
);
userRouter.post(
  "/",
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  UsersController.create
);
userRouter.put(
  "/:id",
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  UsersController.update
);
userRouter.delete(
  "/:id",
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  UsersController.delete
);

export { userRouter };
