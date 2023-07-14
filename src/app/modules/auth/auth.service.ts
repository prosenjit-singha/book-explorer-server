import UserModel from "../user/user.model";
import User from "../user/user.type";

const registerUser = async (payload: User) => {
  const data = await UserModel.create(payload);
  return data.toObject();
};

const loginUser = async () => {};

const logoutUser = async () => {};

const changePassword = async () => {};

const AuthService = {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
};

export default AuthService;
