import { Types } from "mongoose";
import { CodeModel } from "./Schemas";

interface ICode {
  _id?: Types.ObjectId;
  code: number;
  expiresAt?: number;
}

export class Code {
  static async findByCode(code: number): Promise<ICode | null> {
    return await CodeModel.findOne({ code });
  }

  static async create(code: ICode): Promise<void> {
    const newCode = new CodeModel(code);
    await newCode.save();
  }

  static async deleteById(_id: Types.ObjectId | undefined): Promise<void> {
    await CodeModel.findByIdAndDelete(_id);
  }
}
