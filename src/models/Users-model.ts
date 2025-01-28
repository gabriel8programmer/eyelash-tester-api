import { IUser } from "../types/types";
import { User } from "./User-schema";

export class UsersModel {
  static async findAll(): Promise<IUser[]> {
    const users: IUser[] = await User.find({});
    return users;
  }

  static async findById(_id: string): Promise<IUser | null> {
    const user: IUser | null = await User.findOne({ _id });
    return user;
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    const user: IUser | null = await User.findOne({ email });
    return user;
  }

  static async create(userData: IUser): Promise<IUser> {
    const userModel = new User(userData);
    const user: IUser = await userModel.save();
    return user;
  }

  static async update(
    _id: string,
    userData: Partial<IUser>
  ): Promise<IUser | null> {
    const updatedUser: IUser | null = await User.findOneAndUpdate(
      { _id },
      { $set: userData },
      { new: true, runValidators: true }
    );
    return updatedUser;
  }

  static async delete(_id: string): Promise<IUser | null> {
    const deletedUser: IUser | null = await User.findByIdAndDelete({ _id });
    return deletedUser;
  }
}
