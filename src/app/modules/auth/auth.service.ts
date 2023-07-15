import UserModel from "../user/user.model";
import User from "../user/user.type";

const registerUser = async (payload: User) => {
  // reassign user role default so that user can register himself as admin
  // payload.role = "user";
  const data = await UserModel.create(payload);

  console.log(data);
  return data;
};

const loginUser = async ({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) => {
  const user = await UserModel.matchPassword(
    userId,
    password,
    "User login unsuccessful.",
    "User `email`, phoneNumber` or `password` is not matching.",
  );

  user.status = "active";

  user.save();

  return user;
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
