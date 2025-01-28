import { IUser } from "../types";
import { User } from "./User-schema";
import { Types } from "mongoose";

export class UsersModel {
  static async findAll(): Promise<IUser[]> {
    const users: IUser[] = await User.find({});
    return users;
  }

  static async findById(_id: Types.ObjectId): Promise<IUser | null> {
    const user: IUser | null = await User.findOne({ _id });
    if (!user) return null;
    return user;
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    const user: IUser | null = await User.findOne({ email });
    if (!user) return null;
    return user;
  }

  static async create(userData: Omit<IUser, "_id">): Promise<IUser> {
    const userModel = new User(userData);
    const user: IUser = await userModel.save();
    return user;
  }

  static async update(
    _id: Types.ObjectId,
    userData: Partial<Omit<IUser, "_id" | "email" | "role">>
  ) {
    const { name, password } = userData;
    const user = await this.findById(_id);
    if (!user) return null;

    const fieldsToUpdate: IUser = {
      _id,
      name: name ?? user.name,
      password: password ?? user.password,
      email: user.email,
      role: user.role,
    };

    const updatedUser = await User.updateOne({ _id }, fieldsToUpdate);
    console.log(updatedUser);
  }

  static async delete(_id: Types.ObjectId) {
    const user = await this.findById(_id);
    if (!user) return null;
    const deletedUser = await User.deleteOne({ _id });
    console.log(deletedUser);
  }
}
