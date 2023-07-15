import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import type { Secret } from "jsonwebtoken";
import type { UserRole } from "../../types/userRole.type";
import config from "../../config";
import ApiError from "../../errors/apiError";
import { jwtHelpers } from "../../helpers/jwt.helper";
import verifyUser from "../../shared/verifyUser";

const auth =
  (...requiredRoles: UserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // bearer refresh-token-demo-text
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      const decoded = jwtHelpers.verifyToken(
        token,
        config.jwt.secret_key as Secret,
      );

      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "Forbidden",
          "Operation not allowed",
        );
      }

      // check if the user is exist on database
      await verifyUser(decoded, "Unauthorize user.");

      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
