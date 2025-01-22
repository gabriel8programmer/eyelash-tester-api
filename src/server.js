
const express = require("express")
const authRouter = require("./routes/auth")

const app = express()

app.use(express.json())

app.use("/auth", authRouter)

app.listen(3000, () => {
    console.log("Server running in http://localhost:3000/")
})