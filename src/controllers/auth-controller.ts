import { Handler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { HttpError } from "../errors/HttpError";
import { LoginSchema } from "../types/schema";
import { z } from "zod";
import { sendVerificationCode } from "../utils/email";
import { Code } from "../models/Code";

const verifyCodeLoginSchema = z.object({
  code: z.number(),
  email: z.string().email(),
});

const forgotPasswordSchema = verifyCodeLoginSchema.pick({ email: true });

export class AuthController {
  static sendCode: Handler = async (req, res, next) => {
    try {
      const { email } = req.body;
      const code = await sendVerificationCode(email);
      await Code.create({ code });
      res.json({ message: "Verification code sended!" });
    } catch (error) {
      next(error);
    }
  };

  static verifyCode: Handler = async (req, res, next) => {
    try {
      res.json({ message: "Code verifieds!" });
    } catch (error) {
      next(error);
    }
  };

  static login: Handler = async (req, res, next) => {
    try {
      const { email } = LoginSchema.parse(req.body);
      const user = await User.findByEmail(email);
      if (!user) throw new HttpError(404, "User not found!");

      const payload = { email: user.email };
      const jwtKey: string = process.env.API_JWT_SECRET_KEY ?? "my_super_secret_key";

      const token = jwt.sign(payload, jwtKey, {
        expiresIn: "1d",
      });

      res.status(202).json({ token });
    } catch (error) {
      next(error);
    }
  };

  static forgotPassword: Handler = async (req, res, next) => {
    try {
      const { email } = forgotPasswordSchema.parse(req.body);
      const user = await User.findByEmail(email);
      if (!user) throw new HttpError(404, "User not found!");

      const code = await sendVerificationCode(user.email);
      await Code.create({ code });

      res.json({ message: "Recuperation code password sended!" });
    } catch (error) {
      next(error);
    }
  };

  static resetPassword: Handler = async (req, res, next) => {
    try {
      const { password } = req.params;
    } catch (error) {
      next(error);
    }
  };
}
