const UsersModel = require("../models/users-model")
const bcrypt = require("bcrypt")

module.exports = {
    //GET /users
    readAll: async (req, res) => {
        const users = await UsersModel.getAllUsers()
        res.status(200).json(users)
    },

    //GET /users/:id
    readOne: async (req, res) => {
        const { id } = req.params
        const user = await UsersModel.getUserById(id)
        res.status(200).json(user)
    },

    //POST /users
    create: async (req, res) => {
        const { name, email, password, role } = req.body
        const templateUser = { name, email, role: role ?? "standard", password: bcrypt.hashSync(password) }
        const user = await UsersModel.createUser(templateUser)
        res.status(201).json({ data: { ...user }, message: "User saved with success!" })
    },

    //PUT /users/:id
    update: async (req, res) => {
        const { id } = req.params
        const { name, email, password } = req.body

        const data = {
            name: name ?? user.name,
            email: email ?? user.email,
            password: password ?? user.password
        }

        await UsersModel.updateUserById(id, data)
        res.status(200).json({ data: { id, ...data }, message: "User updated with success!" })
    },

    //DELETE /users/:id
    delete: async (req, res) => {
        const { id } = req.params
        await UsersModel.deleteUserById(id)
        res.status(200).json({ id, message: "User deleted with success!" })
    }

}