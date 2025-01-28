import { IEyelash } from "../types";
import { Eyelash } from "./Eyelash-schema";
import { Types } from "mongoose";

export class EyelashesModel {
  static async findAll(): Promise<IEyelash[]> {
    const eyelashes: IEyelash[] = await Eyelash.find({});
    return eyelashes;
  }

  static async findById(_id: Types.ObjectId): Promise<IEyelash | null> {
    let eyelash: IEyelash | null = await Eyelash.findOne({ _id });
    return eyelash;
  }

  static async create(eyelashData: IEyelash): Promise<IEyelash> {
    const eyelashModel = new Eyelash(eyelashData);
    const eyelash: IEyelash = await eyelashModel.save();
    return eyelash;
  }

  static async update(
    _id: Types.ObjectId,
    data: Partial<Omit<IEyelash, "_id">>
  ) {
    const { name, imageUrl } = data;
    const eyelash = await this.findById(_id);
    if (!eyelash) return null;

    const fieldsToUpdate: Partial<IEyelash> = {
      _id: _id,
      name: name ?? eyelash.name,
      imageUrl: imageUrl ?? eyelash.imageUrl,
    };

    const eyelashUpdated = await Eyelash.updateOne({ _id }, fieldsToUpdate);
    console.log(eyelashUpdated);
  }

  static async delete(_id: Types.ObjectId) {
    const eyelash = this.findById(_id);
    if (!eyelash) return null;
    const deletedEyelash = await Eyelash.deleteOne({ _id });
    console.log(deletedEyelash);
  }
}
