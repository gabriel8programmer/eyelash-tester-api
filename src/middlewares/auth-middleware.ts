import { Handler, Request } from "express";
import { HttpError } from "../errors/HttpError";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/User";
import { IUser } from "../types/types";

const decodedTokenSchema = z.object({
  email: z.string().email(),
});

declare module "express" {
  export interface Request {
    user?: IUser;
  }
}

export class AuthMiddleware {
  static ensureAuth: Handler = async (req: Request, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new HttpError(400, "Invalid token!");

      const token = authHeader.split(" ")[1];
      const secretKey = process.env.API_JWT_SECRET_KEY as string;
      const decodedToken = jwt.verify(token, secretKey);
      const { email } = decodedTokenSchema.parse(decodedToken);

      const user = await User.findByEmail(email);
      if (!user) throw new HttpError(400, "Invalid token!");
      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };

  static ensureIsAdmin: Handler = (req: Request, res, next) => {
    try {
      const { user } = req;
      if (user?.role === "admin") next();
      else throw new HttpError(401, "User is not admin!");
    } catch (error) {
      next(error);
    }
  };
}
