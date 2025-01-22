const usersModel = require("../models/users-model")

module.exports = {

    //GET /users
    getAllUsers: (req, res) => {
        const users = usersModel.getAll()
        res.status(200).json(users)
    },

    //GET /users/:id
    getOneUser: (req, res) => {
        const { id } = req.params
        const user = usersModel.show(id)
        res.status(200).json(user)
    },

    //POST /users
    save: (req, res) => {
        const { email, password } = req.body
        const newUser = usersModel.create({ email, password, role: "standard" })
        res.status(201).json(newUser)
    },

    //PUT /users/:id
    update: (req, res) => {
        const { id } = req.params
        const { email, password } = req.body
        const data = { email, password }
        const updatedUser = usersModel.update(id, data)
        res.status(200).json(updatedUser)
    },

    //DELETE /users/:id
    delete: (req, res) => {
        const { id } = req.params
        const deletedUser = usersModel.delete(id)
        res.status(200).json(deletedUser)
    }
}