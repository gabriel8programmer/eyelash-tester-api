import { Handler } from "express";
import jwt from "jsonwebtoken";
import { UsersModel } from "../models/Users-model";
import bcrypt from "bcrypt";
import { HttpError } from "../errors/HttpError";
import { LoginSchema } from "../types/schema";
import { createUser } from "../utils/usersHelpers";

export class AuthController {
  static register: Handler = async (req, res, next) => {
    try {
      const user = await createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  static login: Handler = async (req, res, next) => {
    try {
      const bodyParsed = LoginSchema.parse(req.body);
      const { email, password } = bodyParsed;
      const user = await UsersModel.findByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password)))
        throw new HttpError(400, "Invalid credentials!");

      const payload = { email: user.email, id: user._id };
      const jwtKey = process.env.API_JWT_SECRET_KEY;

      const token = jwt.sign(payload, jwtKey as string, {
        expiresIn: "1d",
      });

      res.status(202).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
