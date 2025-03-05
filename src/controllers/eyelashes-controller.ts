import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import { deleteOldImage } from "../utils/usersHelpers";
import { EyelashUpdateSchema } from "../types/schema";
import { Eyelash } from "../models/Eyelash";

export class EyelashesController {
  static index: Handler = async (req, res, next) => {
    try {
      const eyelashes = await Eyelash.findAll();
      res.json(eyelashes);
    } catch (error) {
      next(error);
    }
  };

  static show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const eyelash = await Eyelash.findById(id);
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

      const newEyelash = await Eyelash.create(parsedBody);
      res.status(201).json(newEyelash);
    } catch (error) {
      next(error);
    }
  };

  static update: Handler = async (req, res, next) => {
    try {
      const parsedBody = EyelashUpdateSchema.parse(req.body);
      const { id } = req.params;

      const eyelash = await Eyelash.findById(id);
      if (!eyelash) throw new HttpError(404, "Eyelash not found!");

      if (req.file) {
        deleteOldImage(eyelash.image);
        parsedBody.image = req.file.filename;
      }

      const updatedEyelash = await Eyelash.update(id, parsedBody);
      res.json(updatedEyelash);
    } catch (error) {
      next(error);
    }
  };

  static delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const eyelash = await Eyelash.findById(id);
      if (!eyelash) throw new HttpError(404, "Eyelash not found!");

      deleteOldImage(eyelash.image);
      const deletedEyelash = await Eyelash.delete(id);
      res.json(deletedEyelash);
    } catch (error) {
      next(error);
    }
  };
}
