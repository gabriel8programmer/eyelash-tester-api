import express from "express";
import { EyelashesController } from "../controllers/eyelashes-controller";

const eyelashRouter = express.Router();

eyelashRouter.get("/", EyelashesController.index);
eyelashRouter.get("/:id", EyelashesController.show);
eyelashRouter.post("/", EyelashesController.create);
eyelashRouter.put("/:id", EyelashesController.update);
eyelashRouter.delete("/:id", EyelashesController.delete);

export { eyelashRouter };
