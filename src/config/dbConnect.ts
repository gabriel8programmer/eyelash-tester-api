import mongoose from "mongoose";
import { envSchema } from "../types/schema";

const dbConnect = async () => {
  const env = envSchema.parse(process.env);
  return await mongoose.connect(env.MONGODB_URL_CON);
};

export default dbConnect;
