// import auth from "../../middlewares/auth";
import validateReq from "../../middlewares/validateReq";
import UserZodSchema from "../user/userSchema.zod";
import AuthController from "./auth.controller";
import { Router } from "express";

const AuthRoutes = Router();

AuthRoutes.post(
  "/register",
  validateReq(UserZodSchema.user),
  AuthController.registerUser,
);

export default AuthRoutes;
