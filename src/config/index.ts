import dayjs from "dayjs";
import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

type NodeENV = "development" | "production";

const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  expires: dayjs().add(10, "days").toDate(),
};

const jwt = {
  secret_key: process.env.JWT_SECRET_KEY as Secret,
  expires_in: process.env.JWT_EXPIRES_IN as string,
  refresh_secret_key: process.env.JWT_REFRESH_SECRET_KEY as Secret,
  refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,
};

export default {
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV as NodeENV,
  jwt,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  database_url: process.env.DATABASE_URL as string,
  cookieOptions,
};
