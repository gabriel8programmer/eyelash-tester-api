
const express = require("express")
const authRouter = require("./routes/auth")
const db = require("./config/db")

const app = express()

//connect with the database
db().catch(err => console.log(err.message))

app.use(express.json())

app.use("/auth", authRouter)

app.listen(3000, () => {
    console.log("Server running in http://localhost:3000/")
})