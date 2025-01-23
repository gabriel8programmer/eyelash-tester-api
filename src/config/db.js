
const mongoose = require("mongoose")
const { DB_URL } = require("../../env")

const db = async () => {
    await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = db