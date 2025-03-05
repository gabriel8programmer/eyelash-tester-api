import { Handler } from "express";
import { User } from "../models/User";
import { HttpError } from "../errors/HttpError";
import bcrypt from "bcrypt";
import { UserUpdateSchema } from "../types/schema";
import { createUser } from "../utils/users";

export class UsersController {
  static index: Handler = async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  static show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) throw new HttpError(404, "User not found!");
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  static create: Handler = async (req, res, next) => {
    try {
      const { role } = req.body;
      const user = await createUser(req.body, role);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  static update: Handler = async (req, res, next) => {
    try {
      const parsedBody = UserUpdateSchema.parse(req.body);
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) throw new HttpError(404, "User not found!");

      const { password } = parsedBody;
      parsedBody.password =
        typeof password === "string" ? await bcrypt.hash(password, 10) : user.password;

      const userUpdated = await User.update(id, parsedBody);
      res.json(userUpdated);
    } catch (error) {
      next(error);
    }
  };

  static delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) throw new HttpError(404, "User not found!");

      const deletedUser = await User.delete(id);
      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  };
}
