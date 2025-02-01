import express from "express";
import { EyelashesController } from "../controllers/eyelashes-controller";
import { upload } from "../config/muterConfig";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const eyelashRouter = express.Router();

eyelashRouter.get(
  "/",
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  EyelashesController.index
);
eyelashRouter.get(
  "/:id",
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  EyelashesController.show
);
eyelashRouter.post(
  "/",
  upload.single("imageUrl"),
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  EyelashesController.create
);
eyelashRouter.put(
  "/:id",
  upload.single("imageUrl"),
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  EyelashesController.update
);
eyelashRouter.delete(
  "/:id",
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  EyelashesController.delete
);

export { eyelashRouter };
