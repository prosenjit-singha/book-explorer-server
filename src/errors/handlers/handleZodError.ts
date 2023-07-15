import { ZodError } from "zod";

const handleZodError = (error: ZodError) => {
  const err: { [key: string]: string } = {};

  Object.values(error.issues).forEach((issue) => {
    const path = issue.path[issue.path.length - 1];
    err[path] = issue.message;
  });

  return err;
};

export default handleZodError;
