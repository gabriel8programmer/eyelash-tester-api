const eyelashesModel = require("../models/eyelashes-model")
const UsersModel = require("../models/users-model")
const bcrypt = require("bcrypt")

//utils
const isValidEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regexEmail.test(email)
}

module.exports = {

    userEmailValidation: async (req, res, next) => {
        const { email } = req.body
        const userEmailIsAlreadyExists = await UsersModel.getUserByEmail(email)
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Email is already to use!" })
        } else if (userEmailIsAlreadyExists) {
            return res.status(400).json({ message: "Invalid Email format!" })
        } else {
            next()
        }
    },

    userIdValidation: async (req, res, next) => {
        const { id } = req.params
        const user = await UsersModel.getUserById(id)
        if (!user) {
            return res.status(404).json({ message: "User is not found!" })
        } else {
            next()
        }
    },

    userLoginValidation: async (req, res, next) => {
        const { email, password } = req.body
        const user = await UsersModel.getUserByEmail(email)
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Invalid email or password!" })
        } else {
            next()
        }
    },

    eyelashIdValidation: async (req, res, next) => {
        const { id } = req.params
        const eyelash = await eyelashesModel.getEyelashById(id)
        if (!eyelash) {
            return res.status(404).json({ message: "Eyelash is not found!" })
        } else {
            next()
        }
    }

}