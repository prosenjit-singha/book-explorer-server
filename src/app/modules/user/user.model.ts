import { Schema, model } from "mongoose";
import User, { UserMethods, UserModelType } from "./user.type";
import UserConst from "./user.const";
import bcrypt from "bcrypt";
import config from "../../../config";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const userSchema = new Schema<User, UserModelType, UserMethods>(
  {
    email: { type: String, required: true, trim: true, unique: true },
    fullName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    phoneNumber: { type: String, trim: true, unique: true },
    address: { type: String, trim: true },
    role: { type: String, enum: UserConst.role, required: true },
    status: { type: String, enum: UserConst.status, default: "" },
    gender: { type: String, enum: UserConst.gender, default: undefined },
    dateOfBirth: { type: Date, default: null },
  },
  { timestamps: true },
);

// hash the password;
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.static(
  "matchPassword",
  async function (
    userId: string,
    password: string,
    msg = "Password doesn't match.",
    errMsg = "Password doesn't match.",
  ) {
    const user = await this.findOne({ _id: userId });

    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Failed to crosscheck the user password.",
        "User not found.",
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_round),
    );

    if (hashedPassword !== user.password) {
      throw new ApiError(httpStatus.BAD_REQUEST, msg, errMsg);
    }

    return user;
  },
);

const UserModel = model<User, UserModelType>("user", userSchema);

export default UserModel;
