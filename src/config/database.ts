import mongoose from "mongoose";
import { z } from "zod";

const envSchema = z.object({
  MONGODB_URL_CONN: z.string(),
});

const database = async () => {
  const env = envSchema.parse(process.env);
  return await mongoose.connect(env.MONGODB_URL_CONN);
};

export default database;
