import { z } from "zod";

const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const AuthZodSchema = { login };

export default AuthZodSchema;
