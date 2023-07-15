import { z } from "zod";
import UserConst from "./user.const";

const user = z.object({
  body: z.object({
    email: z.string().email(),
    fullName: z.string(),
    password: z.string().min(6),
    // optional props
    role: z.enum(UserConst.role).optional(),
    address: z.string().optional(),
    gender: z.enum(UserConst.gender).optional(),
    dateOfBirth: z.string().optional(),
    status: z.enum(UserConst.status).optional(),
  }),
});

const UserZodSchema = { user };

export default UserZodSchema;
