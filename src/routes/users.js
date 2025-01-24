
const express = require("express")
const usersController = require("../controllers/users-controller")
const { authMiddleware, ensureUserIsAdmin } = require("../middlewares/auth-middleware")
const { userIdValidation, userEmailValidation } = require("../middlewares/valid-middleware")
const usersRouter = express.Router()

usersRouter.get("/", authMiddleware, ensureUserIsAdmin, usersController.readAll)
usersRouter.get("/:id?", authMiddleware, ensureUserIsAdmin, userIdValidation, usersController.readOne)
usersRouter.post("/", authMiddleware, ensureUserIsAdmin, userEmailValidation, usersController.create)
usersRouter.put("/:id", authMiddleware, ensureUserIsAdmin, userIdValidation, usersController.update)
usersRouter.delete("/:id", authMiddleware, ensureUserIsAdmin, userIdValidation, usersController.delete)

module.exports = usersRouter