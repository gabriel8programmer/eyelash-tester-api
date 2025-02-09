require("dotenv").config();

import express from "express";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";
import { eyelashRouter } from "./routes/eyelashes";
import { handlerError } from "./middlewares/handler-error-middleware";
import dbConnect from "./config/dbConnect";

const app = express();

//connect with the database
dbConnect()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: Error) => console.error("Connection error:", err));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/users", userRouter);
app.use("/api/admin/eyelashes", eyelashRouter);

app.get("/", (req, res) => {
  res.send("Bem vindo. Aqui é a primeira página da API!");
});

app.use(handlerError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in http://0.0.0.0:${PORT}/`);
});
