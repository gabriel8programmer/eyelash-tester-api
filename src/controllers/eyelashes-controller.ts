import { Handler } from "express";
import { EyelashesModel } from "../models/Eyelashes-model";
import { HttpError } from "../errors/HttpError";
import { z } from "zod";

const EyelashCreateSchema = z.object({
  name: z.string(),
  imageUrl: z.string().url(),
});

const EyelashUpdateSchema = EyelashCreateSchema.partial();

export class EyelashesController {
  //GET /api/admin/eyelashes
  static index: Handler = async (req, res) => {
    const eyelashes = await EyelashesModel.findAll();
    res.json(eyelashes);
  };

  //GET /api/admin/eyelashes/:id
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

  //POST /api/admin/eyelashes
  static create: Handler = async (req, res, next) => {
    try {
      const parsedBody = EyelashCreateSchema.parse(req.body);
      const newEyelash = await EyelashesModel.create(parsedBody);
      res.status(201).json(newEyelash);
    } catch (error) {
      next(error);
    }
  };

  //PUT /api/admin/eyelashes/:id
  static update: Handler = async (req, res, next) => {
    try {
      const parsedBody = EyelashUpdateSchema.parse(req.body);

      const { id } = req.params;
      const eyelash = await EyelashesModel.findById(id);
      if (!eyelash) throw new HttpError(404, "Eyelash not found!");

      const updatedEyelash = await EyelashesModel.update(id, parsedBody);
      res.json(updatedEyelash);
    } catch (error) {
      next(error);
    }
  };

  //DELETE /api/admin/eyelashes/:id
  static delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const eyelash = await EyelashesModel.findById(id);
      if (!eyelash) throw new HttpError(404, "Eyelash not found!");

      const deletedEyelash = await EyelashesModel.delete(id);
      res.json(deletedEyelash);
    } catch (error) {
      next(error);
    }
  };
}
