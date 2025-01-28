import express from "express";
import { usersController } from "../controllers/users-controller";

const userRouter = express.Router();

userRouter.get("/", usersController.index);
userRouter.get("/:id", usersController.show);
userRouter.post("/", usersController.create);
userRouter.put("/:id", usersController.update);
userRouter.delete("/:id", usersController.delete);

export { userRouter };
