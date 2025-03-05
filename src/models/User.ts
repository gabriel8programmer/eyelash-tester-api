import { UserModel } from "./Schemas";
import { IUser } from "../types/types";

export class User {
  static async findAll(): Promise<IUser[]> {
    return await UserModel.find({});
  }

  static async findById(_id: string): Promise<IUser | null> {
    return await UserModel.findOne({ _id });
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  static async create(userData: IUser): Promise<IUser> {
    const model = new UserModel(userData);
    return await model.save();
  }

  static async update(_id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findOneAndUpdate(
      { _id },
      { $set: userData },
      { new: true, runValidators: true }
    );
  }

  static async delete(_id: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete({ _id });
  }
}
