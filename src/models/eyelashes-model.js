const { Eyelash } = require("./Eyelash")

module.exports = {

    getAllEyelashes: async () => {
        const eyelashes = await Eyelash.find({})
        return eyelashes
    },

    getEyelashById: async (_id) => {
        const eyelash = await Eyelash.findOne({ _id })
        return eyelash
    },

    createEyelash: async ({ name, image_url }) => {
        const newEyelash = new Eyelash({ name, image_url })
        await newEyelash.save()
        return newEyelash
    },

    updateEyelashById: async (_id, data) => {
        await Eyelash.updateOne({ _id }, data)
    },

    deleteEyelashById: async (_id) => {
        await Eyelash.deleteOne({ _id })
    }

}