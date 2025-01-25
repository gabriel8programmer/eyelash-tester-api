
const mongoose = require("mongoose")

const db = async () => {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = db