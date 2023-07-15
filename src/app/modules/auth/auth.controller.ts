import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import AuthService from "./auth.service";

const registerUser = catchAsync(async (req, res) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user: { password, ...userData },
    accessToken,
    refreshToken,
  } = await AuthService.registerUser(req.body);

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });

  return {
    data: {
      accessToken,
      user: userData,
    },
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

const logoutUser = catchAsync(async (req) => {
  const data = await AuthService.logoutUser(req.user.id);

  return {
    data,
    message: "Logout successful.",
  };
});

const AuthController = { registerUser, loginUser, logoutUser };

export default AuthController;
