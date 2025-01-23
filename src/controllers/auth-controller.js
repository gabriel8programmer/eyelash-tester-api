const { API_SECRET_KEY } = require("../../env")
const UsersModel = require("../models/users-model")
const jwt = require("jsonwebtoken")

module.exports = {

    //POST /auth/register
    register: async (req, res) => {
        const { name, email, password, role } = req.body

        const userEmailIsAlreadyExists = UsersModel.getUserByEmail(email)
        if (userEmailIsAlreadyExists) {
            return res.status(404).json({ message: "Email is already to use!" })
        }

        const templateUser = { name, email, password, role: role ?? "standard" }
        const user = await UsersModel.create(templateUser)
        res.status(201).json(user)
    },

    //POST /auth/login
    login: async (req, res) => {
        const { email, password } = req.body

        const user = await UsersModel.getUserByEmail(email)
        if (!user || user.password !== password) {
            return res.status(404).json({ message: "Invalid Credentials!" })
        }

        const payload = { email }
        const token = jwt.sign(payload, API_SECRET_KEY, { expiresIn: "1h" })

        res.status(200).json({ token })
    }
}