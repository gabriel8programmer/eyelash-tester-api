const UsersModel = require("../models/users-model")
const jwt = require("jsonwebtoken")

module.exports = {

    //POST /auth/register
    register: async (req, res) => {
        const { name, email, password } = req.body
        const templateUser = { name, email, password, role: "standard" }
        const user = await UsersModel.createUser(templateUser)
        res.status(201).json(user)
    },

    //POST /auth/login
    login: async (req, res) => {
        const { email } = req.body
        const payload = { email }
        const token = jwt.sign(payload, process.env.API_SECRET_KEY, { expiresIn: "1h" })
        res.status(202).json({ token, message: "Successful login!" })
    }
}