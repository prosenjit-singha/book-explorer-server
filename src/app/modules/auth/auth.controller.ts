import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import AuthService from "./auth.service";

const registerUser = catchAsync(async req => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...data } = await AuthService.registerUser(req.body);

  return {
    data,
    message: "User has been successfully registered.",
  };
});

const loginUser = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, user } = await AuthService.loginUser(
    req.body,
  );

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  return {
    data: { accessToken, user },
    message: "User has been successfully logged in.",
  };
});

const AuthController = { registerUser, loginUser };

export default AuthController;
