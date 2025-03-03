import express from "express";
import { EyelashesController } from "../controllers/eyelashes-controller";
import { upload } from "../config/muter";
import { AuthMiddleware } from "../middlewares/auth-middleware";

const eyelashRouter = express.Router();
const eyelashRouterAdmin = express.Router();

eyelashRouter.get("/", EyelashesController.index);
eyelashRouter.get("/:id", EyelashesController.show);

eyelashRouterAdmin.post(
  "/",
  upload.single("image"),
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  EyelashesController.create
);
eyelashRouterAdmin.put(
  "/:id",
  upload.single("image"),
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  EyelashesController.update
);
eyelashRouterAdmin.delete(
  "/:id",
  AuthMiddleware.ensureAuth,
  AuthMiddleware.ensureIsAdmin,
  EyelashesController.delete
);

export { eyelashRouter, eyelashRouterAdmin };
