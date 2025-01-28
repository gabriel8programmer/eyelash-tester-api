import { Handler } from "express";
import jwt from "jsonwebtoken";
import { UsersModel } from "../models/Users-model";
import bcrypt from "bcrypt";
import { HttpError } from "../errors/HttpError";
import { LoginSchema } from "../types/schema";
import { createUser } from "../utils/usersHelpers";

export class AuthController {
  //POST /auth/register
  static register: Handler = async (req, res, next) => {
    try {
      const user = await createUser(req.body, "standard");
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  //POST /auth/login
  static login: Handler = async (req, res, next) => {
    try {
      const bodyParsed = LoginSchema.parse(req.body);

      const { email, password } = bodyParsed;
      const user = await UsersModel.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password)))
        throw new HttpError(400, "Invalid credentials!");

      const payload = { email: user?.email };
      const jwtKey: any = process.env.API_JWT_SECRET_KEY;
      const token = jwt.sign(payload, jwtKey, {
        expiresIn: "1h",
      });
      res.status(202).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
