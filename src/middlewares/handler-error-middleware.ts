import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";

export const handlerError: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ messge: error.message });
  } else if (error instanceof Error) {
    res.status(400).json({ message: error.message });
  } else {
    res.status(500).json({ message: "Internal server error!" });
  }
};
