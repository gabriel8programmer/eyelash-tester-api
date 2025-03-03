import { z } from "zod";
import { UserCreateSchema } from "../types/schema";
import { UsersModel } from "../models/Users-model";
import { HttpError } from "../errors/HttpError";
import bcrypt from "bcrypt";
import { IUser } from "../types/types";
import path from "node:path";
import fs from "node:fs";

export const createUser = async (
  data: Omit<IUser, "id">,
  role: "admin" | "standard" = "standard"
) => {
  const parsedData = UserCreateSchema.parse(data);

  const { email } = parsedData;
  const emailIsAlreadyInUse = await UsersModel.findByEmail(email);
  if (emailIsAlreadyInUse) throw new HttpError(401, "Email is already in use!");

  parsedData.password = await bcrypt.hash(parsedData.password, 10);
  parsedData.role = role;
  return await UsersModel.create(parsedData);
};

export const initializeUploadDirectory = () => {
  const uploadRelativePath = path.resolve(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadRelativePath)) {
    fs.mkdirSync(uploadRelativePath);
  }
};

export const deleteOldImage = (imageUrl: string) => {
  const pathUpload = path.resolve(__dirname, "../uploads", imageUrl);

  // Verifique se o arquivo existe antes de tentar removê-lo
  fs.access(pathUpload, fs.constants.F_OK, (error) => {
    if (error) {
      // console.log("File does not exist: ", error.message);
      return;
    }

    // Se o arquivo existir, remova-o
    fs.unlink(pathUpload, (deleteError) => {
      if (deleteError) {
        // console.log("Error when trying to delete file: ", deleteError.message);
        return;
      }
      // console.log("File deleted with success!");
    });
  });
};

export const generateNewJwtToken = () => {};
