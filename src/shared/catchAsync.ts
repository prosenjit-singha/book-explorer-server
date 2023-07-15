import { NextFunction, Request, Response } from "express";
import ApiResponse from "../types/apiResponse.type";

type ReqHandlerReturns = Partial<ApiResponse> & {
  data: unknown;
  message: string;
};
export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<ReqHandlerReturns> | ReqHandlerReturns;

const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const resData = await fn(req, res, next);

      const apiRes: ApiResponse = {
        status: resData.status || 200,
        message: resData.message || "Success",
        error: resData.error || null,
        data: resData.data || null,
        meta: resData?.meta,
      };

      res.status(resData.status || 200).json(apiRes);
    } catch (error) {
      next(error);
    }
  };

export default catchAsync;
