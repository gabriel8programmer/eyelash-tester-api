import { Handler } from "express";
import { EyelashesModel } from "../models/Eyelashes-model";
import { HttpError } from "../errors/HttpError";
import { z } from "zod";
import fs from "fs";
import path from "path";

const EyelashCreateSchema = z.object({
  name: z.string(),
  imageUrl: z.string().url().optional(),
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

      // A imagem foi carregada com sucesso, então vamos pegar a URL
      if (req.file) {
        parsedBody.imageUrl = `/uploads/${req.file.filename}`;
      } else {
        throw new HttpError(400, "Image is required.");
      }

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

      // Se o usuário enviou uma nova imagem, devemos processá-la
      if (req.file) {
        // Excluir a imagem antiga da pasta de uploads (caso haja uma)
        const oldImagePath = `${eyelash.imageUrl}`;
        try {
          const fs = require("fs");
          fs.unlinkSync(oldImagePath);
        } catch (err) {
          console.error("Error deleting old image:", err);
        }

        // Atualize o `imageUrl` com o novo nome da imagem
        parsedBody.imageUrl = `${req.file.filename}`;
      }

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

      const oldImagePath = `uploads/${eyelash.imageUrl}`;
      const fs = require("fs");
      fs.unlinkSync(oldImagePath);

      const deletedEyelash = await EyelashesModel.delete(id);
      res.json(deletedEyelash);
    } catch (error) {
      next(error);
    }
  };
}
