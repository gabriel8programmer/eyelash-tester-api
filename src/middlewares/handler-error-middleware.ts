import { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";

export const handlerError: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof HttpError)
    res
      .status(error.status)
      .json({ message: error.message, errorType: "HttpError" });
  else if (error instanceof Error)
    res.status(400).json({
      message: error.message,
      errorType: error.name || "GenericError",
    });
  else
    res
      .status(500)
      .json({ message: "Internal server error!", errorType: "UnknownError" });
};
