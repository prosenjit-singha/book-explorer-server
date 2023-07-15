// import auth from "../../middlewares/auth";
import auth from "../../middlewares/auth";
import validateReq from "../../middlewares/validateReq";
import UserZodSchema from "../user/user.validation";
import AuthController from "./auth.controller";
import { Router } from "express";
import AuthZodSchema from "./auth.validation";

const AuthRoutes = Router();

AuthRoutes.post(
  "/register",
  validateReq(UserZodSchema.user),
  AuthController.registerUser,
);

AuthRoutes.post(
  "/login",
  validateReq(AuthZodSchema.login),
  AuthController.loginUser,
);
AuthRoutes.post("/logout", auth("all"), AuthController.logoutUser);

export default AuthRoutes;
