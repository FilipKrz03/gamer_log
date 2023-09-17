import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

interface Exception {
  status?: number;
  message?: string;
}

export const catchAsyncErrors = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Exception) => next(err));
  };
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong" });
};
