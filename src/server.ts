require("dotenv").config();

import express from "express";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";
import { eyelashRouter } from "./routes/eyelashes";
import { handlerError } from "./middlewares/handler-error-middleware";
import dbConnect from "./config/dbConnect";
import { initializeUploadDirectory } from "./utils/usersHelpers";

const app = express();

//connect with the database
dbConnect()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: Error) => console.error("Connection error:", err));

//create directory of the uploads in the application
initializeUploadDirectory();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/users", userRouter);
app.use("/api/admin/eyelashes", eyelashRouter);

app.use(handlerError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in http://0.0.0.0:${PORT}/`);
});
