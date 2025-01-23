const mongoose = require("mongoose");

const EyelashSchema = new mongoose.Schema({
    name: {
        type: string,
        required: true
    },
    style: string,
    image_url: {
        type: string,
        required: true
    }
})

const Eyelash = mongoose.model("Eyelash", EyelashSchema)

module.exports = { Eyelash, EyelashSchema }