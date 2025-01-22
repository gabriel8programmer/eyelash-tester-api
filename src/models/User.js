const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "standard"
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = { User, UserSchema }