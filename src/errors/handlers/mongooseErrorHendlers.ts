import mongoose from "mongoose";
import { MongoServerError } from "mongodb";

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const error: { [key: string]: string } = {};
  Object.values(err.errors).forEach(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      error[el.path] = el.message;
    },
  );

  return error;
};

export const handleDuplicateError = (err: MongoServerError) => {
  let message = "Mongo Server Error Occur";
  let error: { [key: string]: string } | null = null;
  if (err.code === 11000) {
    const [[key, value]] = Object.entries(err.keyValue);
    message = "Duplicate value existed";
    error = {};
    error[
      key
    ] = `'${key}' value must be unique. This value '${value}' is already exist.`;
  }
  return { error, message };
};

export const handleCastError = (err: mongoose.Error.CastError) => {
  return {
    [err.path]: err.message,
  };
};

export default { handleValidationError, handleDuplicateError, handleCastError };
