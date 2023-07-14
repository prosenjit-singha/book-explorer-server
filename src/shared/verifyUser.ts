import { JwtPayload } from "jsonwebtoken";
import ApiError from "../errors/apiError";
import httpStatus from "http-status";
// import AdminModel from "../modules/admin/admin.model";
// import UserModel from "../modules/user/user.model";

const verifyUser = async (
  user?: JwtPayload,
  errorMessage: string = "Authorization failed.",
) => {
  if (!user) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Authorization failed on service.",
      "'user' is not defined.",
    );
  }
  // verify admin
  if (user.role === "admin" || user.role === "super-admin") {
    const data = await AdminModel.findById(user._id, { password: 0 });

    if (!data) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        errorMessage,
        "User doesn't exist",
      );
    }

    return data;
  }

  // verify user
  const data = await UserModel.findById(user._id);

  if (!data) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      errorMessage,
      "User doesn't exist",
    );
  }

  if (data.status === "blocked") {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Unauthorized user.",
      "User account has been blocked. Ask admin to activate your account.",
    );
  }
  return data;
};

export default verifyUser;
