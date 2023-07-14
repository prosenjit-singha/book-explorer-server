import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ApiError from "../../errors/apiError";
import config from "../../config";
import httpsStatus from "http-status";
import { ZodError } from "zod";
import ApiResponse from "../../types/apiResponse.type";
import { MongoServerError } from "mongodb";
import handleZodError from "../../errors/handlers/handleZodError";
import {
  handleCastError,
  handleDuplicateError,
  handleValidationError,
} from "../../errors/handlers/mongooseErrorHandlers";
import { JsonWebTokenError } from "jsonwebtoken";

const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  let status: number = httpsStatus.INTERNAL_SERVER_ERROR;
  let message: string = "Something went wrong!";
  let error: ApiResponse["error"] | null = null;
  if (err?.name === "ValidationError") {
    status = httpsStatus.BAD_REQUEST;
    error = handleValidationError(err);
    message = "Validation Error Occur";
  } else if (err?.name === "CastError") {
    status = httpsStatus.BAD_REQUEST;
    error = handleCastError(err);
    message = "Cast Error Occur";
  } else if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
    error = err.error;
  } else if (err instanceof ZodError) {
    status = httpsStatus.BAD_REQUEST;
    message = "Validation error occur.";
    error = handleZodError(err);
  } else if (err instanceof MongoServerError) {
    const simplifiedError = handleDuplicateError(err);
    message = simplifiedError.message;
    error = simplifiedError.error;
  } else if (err instanceof JsonWebTokenError) {
    status = httpsStatus.BAD_REQUEST;
    message = "Failed to verify token";
    error = err.message;
  } else if (err instanceof Error) {
    message = err?.message;
  }

  const responseObj: ApiResponse & { stack?: string } = {
    status,
    message,
    error,
    stack: config.node_env === "development" ? err?.stack : undefined,
    data: null,
  };

  res.status(status).json(responseObj);
};

export default globalErrorHandler;
