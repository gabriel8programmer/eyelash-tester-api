import { Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "standard";
}

interface IEyelash {
  _id: Types.ObjectId;
  name: string;
  imageUrl: string;
}
