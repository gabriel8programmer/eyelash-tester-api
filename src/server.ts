import dotenv from "dotenv";
dotenv.config();

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
app.use("/auth", authRouter);
app.use("/admin/users", userRouter);
app.use("/admin/eyelashes", eyelashRouter);

app.use(handlerError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`);
});
