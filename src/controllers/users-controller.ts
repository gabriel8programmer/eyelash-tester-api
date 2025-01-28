import { Handler } from "express";
import { UsersModel } from "../models/Users-model";
import { HttpError } from "../errors/HttpError";
import bcrypt from "bcrypt";
import { UserUpdateSchema } from "../types/schema";
import { createUser } from "../utils/usersHelpers";

export class usersController {
  //GET /api/admin/users
  static index: Handler = async (req, res) => {
    const users = await UsersModel.findAll();
    res.json(users);
  };

  //GET /api/admin/users/:id
  static show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await UsersModel.findById(id);
      if (!user) throw new HttpError(404, "User not found!");
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  //POST /api/admin/users
  static create: Handler = async (req, res, next) => {
    try {
      const user = await createUser(req.body, req.body.role);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  //PUT /api/admin/users/:id
  static update: Handler = async (req, res, next) => {
    try {
      const parsedBody = UserUpdateSchema.parse(req.body);

      const { id } = req.params;
      const user = await UsersModel.findById(id);
      if (!user) throw new HttpError(404, "User not found!");

      const { password } = parsedBody;
      parsedBody.password = password
        ? await bcrypt.hash(password, 10)
        : user.password;

      const userUpdated = await UsersModel.update(id, parsedBody);
      res.json(userUpdated);
    } catch (error) {
      next(error);
    }
  };

  //DELETE /api/admin/users/:id
  static delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await UsersModel.findById(id);
      if (!user) throw new HttpError(404, "User not found!");

      const deletedUser = await UsersModel.delete(id);
      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  };
}
