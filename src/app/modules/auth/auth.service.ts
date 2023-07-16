import httpStatus from "http-status";
import config from "../../../config";
import ApiError from "../../../errors/apiError";
import { jwtHelpers } from "../../../helpers/jwt.helper";
import UserModel from "../user/user.model";
import User from "../user/user.type";
import { Secret } from "jsonwebtoken";

const registerUser = async (payload: User) => {
  // reassign user role default so that user can register himself as user
  payload.role = "user";
  const user = await UserModel.create(payload);

  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.secret_key,
    config.jwt.expires_in,
  );

  const refreshToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.refresh_secret_key,
    config.jwt.refresh_expires_in,
  );

  return { accessToken, refreshToken, user: user.toObject() };
};

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const result = await UserModel.matchPassword(
    email,
    password,
    "Authentication Failed!",
    "User `email`, phoneNumber` or `password` is not matching.",
  );

  result.status = "active";

  await result.updateOne({ status: "active" });

  const jwtPayload = {
    id: result._id,
    email: result.email,
    role: result.role,
  };

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.secret_key,
    config.jwt.expires_in,
  );

  const refreshToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.refresh_secret_key,
    config.jwt.refresh_expires_in,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...data } = result.toObject();

  return { accessToken, refreshToken, user: data };
};

const logoutUser = async (userId: string) => {
  console.log(userId);

  const result = await UserModel.findOneAndUpdate(
    { _id: userId },
    { status: "inactive" },
  )
    .lean()
    .exec();

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Failed to log out.",
      "User doesn't exist",
    );
  }

  console.log(result);

  return { _id: result._id, fullName: result.fullName, email: result.email };
};

const refreshToken = async (token: string) => {
  let verifiedPayload = null;

  try {
    verifiedPayload = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret_key as Secret,
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const user = await UserModel.findById(verifiedPayload.id).lean().exec();

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  const { id, email, role } = verifiedPayload;

  const newAccessToken = jwtHelpers.createToken(
    { id, email, role },
    config.jwt.secret_key as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
    user,
  };
};

const changePassword = async () => {};

const AuthService = {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  refreshToken,
};

export default AuthService;
