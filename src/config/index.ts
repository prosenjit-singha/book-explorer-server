import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

type NodeENV = "development" | "production";

const jwt = {
  secret: process.env.JWT_SECRET_KEY as Secret,
  expire_in: process.env.JWT_EXPIRE_IN as string,
  refresh_secret: process.env.JWT_REFRESH_SECRET_KEY as Secret,
  refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN as string,
};

export default {
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV as NodeENV,
  jwt,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  database_url: process.env.DATABASE_URL as string,
};
