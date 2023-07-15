import { Request, Response } from "express";
import httpStatus from "http-status";

const handleNotFoundAPI = (_req: Request, res: Response) =>
  res.status(httpStatus.NOT_FOUND).json({
    status: httpStatus.NOT_FOUND,
    message: "Api Not Found!",
    data: null,
  });

export default handleNotFoundAPI;
