import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwt.helper";
import UserModel from "../user/user.model";
import User from "../user/user.type";

const registerUser = async (payload: User) => {
  // reassign user role default so that user can register himself as admin
  payload.role = "user";
  const data = await UserModel.create(payload);
  return data.toObject();
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
    "User login unsuccessful.",
    "User `email`, phoneNumber` or `password` is not matching.",
  );

  const user = await result
    .updateOne({ status: "active" }, { new: true })
    .select("-password");

  const jwtPayload = {
    userId: user._id,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { password: pass, ...data } = user.toObject();

  return { accessToken, refreshToken, user };
};

const logoutUser = async () => {};

const changePassword = async () => {};

const AuthService = {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
};

export default AuthService;
