import mongoose from "mongoose";

const dbConnect = async () => {
  const dbPort = process.env.DB_PORT;
  const dbHost = process.env.DB_HOST;
  const db = process.env.DATABASE;
  const dbUrl = `mongodb://${dbHost}:${dbPort}/${db}`;

  await mongoose.connect(dbUrl);
};

export default dbConnect;
