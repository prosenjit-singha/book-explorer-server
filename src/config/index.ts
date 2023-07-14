import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

type NodeENV = "development" | "production";

export default {
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV as NodeENV,
};
