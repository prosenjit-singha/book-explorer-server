import catchAsync from "../../../shared/catchAsync";
import AuthService from "./auth.service";

const registerUser = catchAsync(async req => {
  const data = await AuthService.registerUser(req.body);

  return {
    data,
    message: "User has been successfully registered.",
  };
});

const loginUser = catchAsync(async req => {
  const data = await AuthService.loginUser(req.body);

  return {
    data,
    message: "User has been successfully logged in.",
  };
});

const AuthController = { registerUser, loginUser };

export default AuthController;
