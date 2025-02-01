import { IEyelash } from "../types/types";
import { Eyelash } from "./Eyelash-schema";

export class EyelashesModel {
  static async findAll(): Promise<IEyelash[]> {
    return await Eyelash.find({});
  }

  static async findById(_id: string): Promise<IEyelash | null> {
    return await Eyelash.findById({ _id });
  }

  static async create(eyelashData: IEyelash): Promise<IEyelash> {
    const eyelashModel = new Eyelash(eyelashData);
    return await eyelashModel.save();
  }

  static async update(_id: string, data: Partial<IEyelash>): Promise<IEyelash | null> {
    return await Eyelash.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true, runValidators: true }
    );
  }

  static async delete(_id: string): Promise<IEyelash | null> {
    return await Eyelash.findByIdAndDelete({
      _id,
    });
  }
}
