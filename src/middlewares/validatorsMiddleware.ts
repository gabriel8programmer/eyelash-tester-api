import { Handler, Request } from "express";
import { LoginSchema } from "../types/schema";
import { HttpError } from "../errors/HttpError";
import bcrypt from "bcrypt";
import { validateUserByEmail } from "../utils/users";
import { IUser } from "../types/types";
import { Code } from "../models/Code";
import { z } from "zod";

declare module "express" {
  export interface Request {
    user?: IUser;
    code?: number;
  }
}

const verifyCodeLoginSchema = z.object({
  code: z.number(),
});

export const validateLogin: Handler = async (req: Request, res, next) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);
    const user = await validateUserByEmail(email);

    if (!(await bcrypt.compare(password, user.password)))
      throw new HttpError(400, "Invalid credentials!");

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const validateCode: Handler = async (req: Request, res, next) => {
  try {
    const { code: codeNumber } = verifyCodeLoginSchema.parse(req.body);

    const code = await Code.findByCode(codeNumber);
    if (!code) throw new HttpError(404, "Invalid code!");

    if (Date.now() > (code.expiresAt as number)) {
      throw new Error("Expired code!");
    }

    req.code = code.code;
    next();
  } catch (error) {
    next(error);
  }
};

export const ensureValidatedLogin: Handler = (req: Request, res, next) => {
  try {
    if (!req.user?.email) throw new Error("User data invalid!");
    next();
  } catch (error) {
    next(error);
  }
};

export const ensureVerifiedCode: Handler = (req: Request, res, next) => {
  try {
    if (!req.code) throw new Error("Code not verified!");
    next();
  } catch (error) {
    next(error);
  }
};
