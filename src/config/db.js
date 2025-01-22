
const mongoose = require("mongoose")

const db = async () => {
    await mongoose.connect('mongodb://localhost/db_eyelashes', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = db