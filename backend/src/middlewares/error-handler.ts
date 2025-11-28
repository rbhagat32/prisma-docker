import type { NextFunction, Request, Response } from "express";

export class ErrorHandler extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const ErrorHandlerMiddleware = (
  err: ErrorHandler,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-varss
  _next: NextFunction
) => {
  err.statusCode ||= 500;
  err.message ||= "Internal Server Error";

  console.log(err);

  return res.status(err.statusCode).json({
    status: err.statusCode,
    error: err.name,
    message: err.message,
    timestamp: new Date().toISOString(),
  });
};
