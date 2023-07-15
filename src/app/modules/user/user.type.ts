import { Document, Model, Types } from "mongoose";
import UserConst from "./user.const";

type UserRole = (typeof UserConst.role)[number];
type Gender = (typeof UserConst.gender)[number];
type Status = (typeof UserConst.status)[number];

type User = {
  email: string;
  role: UserRole;
  fullName: string;
  password: string;
  address?: string;
  phoneNumber?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  status?: Status;
};

export type UserMethods = object;

export type UserModelType = Model<User, object, UserMethods> & {
  matchPassword: (
    userId: string,
    password: string,
    msg?: string,
    errMsg?: string,
  ) => Promise<
    Document<unknown, object, User> &
      Omit<
        Omit<User, "password"> & {
          _id: Types.ObjectId;
        },
        never
      > &
      object
  >;
};

export default User;
