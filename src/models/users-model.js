const { User } = require("./User")

module.exports = {

    getAll: async () => {
        const users = await User.find({})
        return users
    },

    show: async (_id) => {
        const user = await User.findById({ _id })
        return user
    },

    create: async ({ name, email, password, role }) => {
        const user = new User(name, email, password, role)
        await user.save()
        return user
    },

    update: async (_id, { name, email, password }) => {
        const userUpdated = await User.findByIdAndUpdate({ _id }, { name, email, password })
        await userUpdated.save()
        return userUpdated
    },

    delete: async (_id) => {
        const userRemoved = await User.findByIdAndDelete({ _id })
        return userRemoved
    }
}