
const express = require("express")
const eyelashController = require("../controllers/eyelash-controller")
const { eyelashIdValidation } = require("../middlewares/valid-middleware")
const { authMiddleware, ensureUserIsAdmin } = require("../middlewares/auth-middleware")
const eyelashesRouter = express.Router()

eyelashesRouter.get("/", authMiddleware, ensureUserIsAdmin, eyelashController.index)
eyelashesRouter.get("/:id", authMiddleware, ensureUserIsAdmin, eyelashIdValidation, eyelashController.readOne)
eyelashesRouter.post("/", authMiddleware, ensureUserIsAdmin, eyelashController.create)
eyelashesRouter.put("/:id", authMiddleware, ensureUserIsAdmin, eyelashIdValidation, eyelashController.update)
eyelashesRouter.delete("/:id", authMiddleware, ensureUserIsAdmin, eyelashIdValidation, eyelashController.delete)

module.exports = eyelashesRouter