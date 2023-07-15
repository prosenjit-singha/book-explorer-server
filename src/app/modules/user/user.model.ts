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
    phoneNumber: { type: String, trim: true, unique: true, default: null },
    address: { type: String, trim: true, default: null },
    role: { type: String, enum: UserConst.role, required: true },
    status: { type: String, enum: UserConst.status, default: "active" },
    gender: { type: String, enum: [...UserConst.gender, null], default: null },
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
    const orCond = UserConst.uniqueId.map(field => ({ [field]: userId }));
    const user = await this.findOne({ $or: orCond });

    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Failed to crosscheck the user password.",
        "User not found.",
      );
    }

    const isMatched: boolean = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new ApiError(httpStatus.BAD_REQUEST, msg, errMsg);
    }

    return user;
  },
);

const UserModel = model<User, UserModelType>("user", userSchema);

export default UserModel;
