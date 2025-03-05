import { Handler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { HttpError } from "../errors/HttpError";
import { LoginSchema } from "../types/schema";

export class AuthController {
  static verifyEmail: Handler = async (req, res) => {
    const { email } = req.body;
    res.json({ message: "Email verified successfully!", email });
  };

  static login: Handler = async (req, res, next) => {
    try {
      const bodyParsed = LoginSchema.parse(req.body);
      const { email, password } = bodyParsed;
      const user = await User.findByEmail(email);

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

  static recoverPassword: Handler = async (req, res) => {};
}
