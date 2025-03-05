import { IEyelash } from "../types/types";
import { EyelashModel } from "./Schemas";

export class Eyelash {
  static async findAll(): Promise<IEyelash[]> {
    return await EyelashModel.find({});
  }

  static async findById(_id: string): Promise<IEyelash | null> {
    return await EyelashModel.findById({ _id });
  }

  static async create(eyelashData: IEyelash): Promise<IEyelash> {
    const eyelashModel = new EyelashModel(eyelashData);
    return await eyelashModel.save();
  }

  static async update(_id: string, data: Partial<IEyelash>): Promise<IEyelash | null> {
    return await EyelashModel.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true, runValidators: true }
    );
  }

  static async delete(_id: string): Promise<IEyelash | null> {
    return await EyelashModel.findByIdAndDelete({
      _id,
    });
  }
}
