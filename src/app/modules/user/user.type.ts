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

export default User;
