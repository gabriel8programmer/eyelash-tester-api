
const express = require("express")
const db = require("./config/db")
const authRouter = require("./routes/auth")
const usersRouter = require("./routes/users")
const eyelashesRouter = require("./routes/eyelashes")

const app = express()

//connect with the database
db().then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err))

app.use(express.json())

app.use("/auth", authRouter)
app.use("/admin/users", usersRouter)
app.use("/admin/eyelashes", eyelashesRouter)

app.listen(3000, () => {
    console.log("Server running in http://localhost:3000/")
})