
const express = require("express")
const authController = require("../controllers/auth-controller")
const { userEmailValidation, userLoginValidation } = require("../middlewares/valid-middleware")

const authRouter = express.Router()

authRouter.post("/register", userEmailValidation, authController.register)
authRouter.post("/login", userLoginValidation, authController.login)

module.exports = authRouter