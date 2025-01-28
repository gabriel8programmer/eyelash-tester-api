import { Handler } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { UsersModel } from "../models/Users-model";
import bcrypt from "bcrypt";
import { HttpError } from "../errors/HttpError";

const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["admin", "standard"]).default("standard"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class AuthController {
  //POST /auth/register
  register: Handler = async (req, res, next) => {
    try {
      const bodyParsed = RegisterSchema.parse(req.body);

      const { email } = bodyParsed;
      const emailIsAlreadyInUse = await UsersModel.findByEmail(email);
      if (emailIsAlreadyInUse)
        throw new HttpError(401, "Email is already in use!");

      bodyParsed.password = await bcrypt.hash(bodyParsed.password, 10);
      const user = await UsersModel.create(bodyParsed);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  //POST /auth/login
  login: Handler = async (req, res, next) => {
    try {
      const bodyParsed = loginSchema.parse(req.body);
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
