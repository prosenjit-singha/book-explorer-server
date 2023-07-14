import { Schema, model } from "mongoose";
import User from "./user.type";
import UserConst from "./user.const";

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, enum: UserConst.role, default: "user" },
    address: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    gender: { type: String, enum: UserConst.gender, default: undefined },
    dateOfBirth: { type: Date, default: null },
    status: { type: String, enum: UserConst.status, default: "active" },
  },
  { timestamps: true },
);

const UserModel = model<User>("User", userSchema);

export default UserModel;
