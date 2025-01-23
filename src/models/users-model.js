const { User } = require("./User")

const UsersModel = {

    getAllUsers: async () => {
        const users = await User.find({})
        return users
    },

    getUserById: async (_id) => {
        const user = await User.findOne({ _id })
        return user
    },

    getUserByEmail: async (email) => {
        const user = await User.findOne({ email })
        return user
    },

    createUser: async ({ name, email, password, role }) => {
        const user = new User({ name, email, password, role })
        await user.save()
        return user
    },

    updateUserById: async (_id, { name, email, password }) => {
        const userUpdated = await User.findByIdAndUpdate({ _id }, { name, email, password })
        return userUpdated
    },

    deleteUserById: async (_id) => {
        const userRemoved = await User.findByIdAndDelete({ _id })
        return userRemoved
    }
}

module.exports = UsersModel