require("dotenv").config();

import express from "express";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";
import { eyelashRouter, eyelashRouterAdmin } from "./routes/eyelashes";
import { handlerError } from "./middlewares/handler-error-middleware";
import database from "./config/database";
import { initializeUploadDirectory } from "./utils/usersHelpers";
import cors from "cors";

const app = express();

app.use(cors());

//connect with the database
database()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: Error) => console.error("Connection error:", err));

//create directory of the uploads in the application
initializeUploadDirectory();

app.use(express.json());
app.use("/api/eyelashes", eyelashRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin/users", userRouter);
app.use("/api/admin/eyelashes", eyelashRouterAdmin);

app.use(handlerError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in Port: ${PORT}`);
});
