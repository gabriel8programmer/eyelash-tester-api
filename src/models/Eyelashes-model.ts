import { IEyelash } from "../types/types";
import { Eyelash } from "./Eyelash-schema";

export class EyelashesModel {
  static async findAll(): Promise<IEyelash[]> {
    const eyelashes: IEyelash[] = await Eyelash.find({});
    return eyelashes;
  }

  static async findById(_id: string): Promise<IEyelash | null> {
    let eyelash: IEyelash | null = await Eyelash.findById({ _id });
    return eyelash;
  }

  static async create(eyelashData: IEyelash) {
    const eyelashModel = new Eyelash(eyelashData);
    const eyelash = await eyelashModel.save();
    return eyelash;
  }

  static async update(_id: string, data: Partial<IEyelash>): Promise<IEyelash | null> {
    const eyelashUpdated: IEyelash | null = await Eyelash.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true, runValidators: true }
    );
    return eyelashUpdated;
  }

  static async delete(_id: string): Promise<IEyelash | null> {
    const deletedEyelash: IEyelash | null = await Eyelash.findByIdAndDelete({
      _id,
    });
    return deletedEyelash;
  }
}
