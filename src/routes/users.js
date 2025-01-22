
const usersController = require("../controllers/users-controller")

const express = require("express")
const usersRouter = express.Router()

usersRouter.get("/", usersController.getAllUsers)
usersRouter.get("/:id", usersController.getOneUser)
usersRouter.post("/", usersController.save)
usersRouter.put("/:id", usersController.update)
usersRouter.delete("/:id", usersController.delete)

module.exports = usersRouter