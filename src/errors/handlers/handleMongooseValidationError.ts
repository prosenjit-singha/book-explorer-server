import mongoose from "mongoose";

const handleMongooseValidationError = (err: mongoose.Error.ValidationError) => {
  const error: { [key: string]: string } = {};
  Object.values(err.errors).forEach(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      error[el.path] = el.message;
    },
  );

  return error;
};

export default handleMongooseValidationError;
