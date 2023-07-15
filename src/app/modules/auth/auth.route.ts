// import auth from "../../middlewares/auth";
import validateReq from "../../middlewares/validateReq";
import UserZodSchema from "../user/user.validation";
import AuthController from "./auth.controller";
import { Router } from "express";

const AuthRoutes = Router();

AuthRoutes.post(
  "/register",
  validateReq(UserZodSchema.user),
  AuthController.registerUser,
);

AuthRoutes.post("/login", AuthController.loginUser);

export default AuthRoutes;
