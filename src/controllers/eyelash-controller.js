const eyelashesModel = require("../models/eyelashes-model")

module.exports = {
    //GET /eyelashes
    index: async (req, res) => {
        const eyelashes = await eyelashesModel.getAllEyelashes()
        res.status(200).json(eyelashes)
    },

    //GET /eyelashes/:id
    readOne: async (req, res) => {
        const { id } = req.params
        const eyelash = await eyelashesModel.getEyelashById(id)
        res.status(200).json(eyelash)
    },

    //POST /eyelashes
    create: async (req, res) => {
        const { name, image_url } = req.body
        const data = { name, image_url }
        const eyelash = await eyelashesModel.createEyelash(data)
        res.status(201).json(eyelash)
    },

    //PUT /eyelashes/:id
    update: async (req, res) => {
        const { id } = req.params
        const { name, image_url } = req.body
        const eyelash = await eyelashesModel.getEyelashById(id)

        const data = {
            name: name ?? eyelash.name,
            image_url: image_url ?? eyelash.image_url
        }

        await eyelashesModel.updateEyelashById(id, data)
        res.status(200).json({ data: { id, ...data }, message: "Eyelash updated with success!" })
    },

    //DELETE /eyelashes/:id
    delete: async (req, res) => {
        const { id } = req.params
        await eyelashesModel.deleteEyelashById(id)
        res.status(200).json({ id, message: "Eyelash deleted with success!" })
    }

}