import { IUser } from "../types/types";
import { User } from "./User-schema";

export class UsersModel {
  static async findAll(): Promise<IUser[]> {
    return await User.find({});
  }

  static async findById(_id: string): Promise<IUser | null> {
    return await User.findOne({ _id });
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  static async create(userData: IUser): Promise<IUser> {
    const userModel = new User(userData);
    return await userModel.save();
  }

  static async update(_id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return await User.findOneAndUpdate(
      { _id },
      { $set: userData },
      { new: true, runValidators: true }
    );
  }

  static async delete(_id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete({ _id });
  }
}
