import express from "express";
import { EyelashesController } from "../controllers/eyelashes-controller";
import { upload } from "../config/muterConfig";

const eyelashRouter = express.Router();

eyelashRouter.get("/", EyelashesController.index);
eyelashRouter.get("/:id", EyelashesController.show);
eyelashRouter.post("/", upload.single("imageUrl"), EyelashesController.create);
eyelashRouter.put("/:id", upload.single("imageUrl"), EyelashesController.update);
eyelashRouter.delete("/:id", upload.single("imageUrl"), EyelashesController.delete);

export { eyelashRouter };
