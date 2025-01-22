const { User } = require("./User")

const usersModel = {

    getAll: async () => {
        const users = await User.find({})
        return users
    },

    show: async (_id) => {
        const user = await User.findOne(_id)
        return user
    },

    create: async (email, password, role) => {
        try {
            const newUser = new User({ email, password, role })
            await newUser.save()
            return newUser
        } catch (error) {
            console.log(error.message)
        }
    },

    update: async (_id, data) => {
        const userUpdated = await User.findOneAndUpdate({ _id }, data)
        await userUpdated.save()
        return userUpated
    },

    delete: async (_id) => {
        const userDeleted = await User.deleteOne({ _id })
        return userDeleted
    }
}

module.exports = usersModel