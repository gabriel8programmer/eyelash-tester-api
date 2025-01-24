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

    },

    //PUT /eyelashes/:id
    update: async (req, res) => {

    },

    //DELETE /eyelashes/:id
    delete: async (req, res) => {

    }

}