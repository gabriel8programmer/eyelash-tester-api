const { API_SECRET_KEY } = require("../../env")
const jwt = require("jsonwebtoken")
const UsersModel = require("../models/users-model")

module.exports = {

    authMiddleware: (req, res, next) => {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(404).json({ message: "Invalid token!" })
        }

        const token = authHeader.split(" ")[1]

        try {

            const decodedToken = jwt.verify(token, API_SECRET_KEY)
            const { email } = decodedToken
            const user = UsersModel.getUserByEmail(email)
            if (!user) {
                return res.status(404).json({ message: "Invalid token!" })
            }

            req.authenticatedUser = user
            next()

        } catch (error) {
            res.status(404).json({ message: error.message })
            throw error
        }
    },

    ensureUserIsAdmin: (req, res, next) => {
        const { role } = req.authenticatedUser
        if (role === "admin") {
            next()
        } else {
            return res.status(404).json({ message: "User is not admin!" })
        }
    }
}