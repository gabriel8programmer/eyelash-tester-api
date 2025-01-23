const UsersModel = require("../models/users-model")

module.exports = {
    //GET /admin/users
    getUsers: async (req, res) => {
        const users = await UsersModel.getAllUsers()
        res.status(200).json(users)
    },

    //GET /admin/users/:id
    getUserById: async (req, res) => {
        const { id } = req.params
        const user = await UsersModel.getUserById(id)
        res.status(200).json(user)
    },

    //GET /admin/users/:email
    getUserByEmail: async (req, res) => {
        const { email } = req.params
        const user = await UsersModel.getUserByEmail(email)
        res.status(200).json(user)
    },

    //PUT /admin/users/:id
    update: async (req, res) => {
        const { id } = req.params
        const { name, email, password } = req.body

        const user = await UsersModel.getUserById(id)
        if (!user) {
            return res.status(404).json({ message: "User is not found!" })
        }

        const data = { name, email, password }
        const userUpdated = await UsersModel.updateUserById(id, data)
        res.status(200).json(userUpdated)
    },

    //DELETE /admin/users/:id
    delete: async (req, res) => {
        const { id } = req.params

        const user = await UsersModel.getUserById(id)
        if (!user) {
            return res.status(404).json({ message: "User is not found!" })
        }

        const userRemoved = await UsersModel.deleteUserById(id)
        res.status(200).json(userRemoved)
    }

}