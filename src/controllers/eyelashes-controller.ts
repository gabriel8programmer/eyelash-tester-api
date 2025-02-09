import { Handler } from "express";
import { EyelashesModel } from "../models/Eyelashes-model";
import { HttpError } from "../errors/HttpError";
import { deleteOldImage } from "../utils/usersHelpers";
import { EyelashSchema, EyelashUpdateSchema } from "../types/schema";

export class EyelashesController {
  static index: Handler = async (req, res, next) => {
    try {
      const eyelashes = await EyelashesModel.findAll();
      res.json(eyelashes);
    } catch (error) {
      next(error);
    }
  };

  static show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const eyelash = await EyelashesModel.findById(id);
      if (!eyelash) throw new HttpError(404, "Eyelash not found!");
      res.json(eyelash);
    } catch (error) {
      next(error);
    }
  };

  static create: Handler = async (req, res, next) => {
    try {
      const parsedBody = req.body;

      if (!req.file) throw new HttpError(400, "Image is required.");
      parsedBody.image = req.file.filename;

      const newEyelash = await EyelashesModel.create(parsedBody);
      res.status(201).json(newEyelash);
    } catch (error) {
      next(error);
    }
  };

  static update: Handler = async (req, res, next) => {
    try {
      const parsedBody = EyelashUpdateSchema.parse(req.body);
      const { id } = req.params;

      const eyelash = await EyelashesModel.findById(id);
      if (!eyelash) throw new HttpError(404, "Eyelash not found!");

      if (req.file) {
        deleteOldImage(eyelash.image);
        parsedBody.image = req.file.filename;
      }

      const updatedEyelash = await EyelashesModel.update(id, parsedBody);
      res.json(updatedEyelash);
    } catch (error) {
      next(error);
    }
  };

  static delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const eyelash = await EyelashesModel.findById(id);
      if (!eyelash) throw new HttpError(404, "Eyelash not found!");

      deleteOldImage(eyelash.image);
      const deletedEyelash = await EyelashesModel.delete(id);
      res.json(deletedEyelash);
    } catch (error) {
      next(error);
    }
  };
}
