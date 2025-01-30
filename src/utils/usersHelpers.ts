import { z } from "zod";
import { UserCreateSchema } from "../types/schema";
import { UsersModel } from "../models/Users-model";
import { HttpError } from "../errors/HttpError";
import bcrypt from "bcrypt";
import { IEyelash, IUser } from "../types/types";
import path from "node:path";
import fs from "node:fs";

export const createUser = async (
  data: z.infer<typeof UserCreateSchema>,
  role: "admin" | "standard"
): Promise<IUser> => {
  const parsedData = UserCreateSchema.parse(data);

  const { email } = parsedData;
  const emailIsAlreadyInUse = await UsersModel.findByEmail(email);
  if (emailIsAlreadyInUse) throw new HttpError(401, "Email is already in use!");

  parsedData.password = await bcrypt.hash(parsedData.password, 10);
  parsedData.role = role;
  const user = await UsersModel.create(parsedData);
  return user;
};

export const handleFile = (eyelash: IEyelash) => {
  const pathUpload = path.join("uploads", `${eyelash.imageUrl?.toString()}`);
  fs.unlink(pathUpload, (error) => {
    if (error) {
      console.log("Error when trying to delete file: ", error.message);
      return;
    }
    console.log("File deleted with success!");
  });
};
