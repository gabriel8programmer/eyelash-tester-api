import { Document, Types } from "mongoose";
import { z } from "zod";

interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface IEyelash {
  _id?: Types.ObjectId;
  name: string;
  image: string;
}
