const { User } = require("./User")

module.exports = {

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

    updateUserById: async (_id, data) => {
        await User.updateOne({ _id }, data)
    },

    deleteUserById: async (_id) => {
        await User.deleteOne({ _id })
    }
}