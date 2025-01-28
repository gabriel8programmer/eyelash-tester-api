import { Handler } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { UsersModel } from "../models/Users-model";
import { HttpError } from "../errors/HttpError";
import bcrypt from "bcrypt";

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
  register: Handler = async (req, res) => {
    const bodyParsed = RegisterSchema.parse(req.body);

    const { email } = bodyParsed;
    const emailIsAlreadyInUse = await UsersModel.findByEmail(email);
    if (emailIsAlreadyInUse)
      throw new HttpError(401, "Email is already in use!");

    const user = await UsersModel.create(bodyParsed);
    user.password = bcrypt.hashSync(user.password, 10);
    res.status(201).json(user);
  };

  //POST /auth/login
  login: Handler = async (req, res) => {
    const bodyParsed = loginSchema.parse(req.body);
    const { email, password } = bodyParsed;

    const user = await UsersModel.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password))
      throw new HttpError(400, "Invalid Credentials!");

    const payload = { id: user._id, email: bodyParsed.email };
    const jwtKey: any = process.env.API_JWT_SECRET_KEY;
    const token = jwt.sign(payload, jwtKey, {
      expiresIn: "1h",
    });
    res.status(202).json({ token });
  };
}
