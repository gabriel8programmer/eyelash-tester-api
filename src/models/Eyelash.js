const mongoose = require("mongoose");

const EyelashSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    style: String,
    image_url: {
        type: String,
        required: true
    }
})

const Eyelash = mongoose.model("Eyelash", EyelashSchema)

module.exports = { Eyelash, EyelashSchema }