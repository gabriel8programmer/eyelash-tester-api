
const express = require("express")
const authRouter = require("./routes/auth")
const db = require("./config/db")
const adminRouter = require("./routes/admin")

const app = express()

//connect with the database
db().then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err))

app.use(express.json())

app.use("/auth", authRouter)
app.use("/admin", adminRouter)

app.listen(3000, () => {
    console.log("Server running in http://localhost:3000/")
})