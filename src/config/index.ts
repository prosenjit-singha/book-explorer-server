import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

// get all env values here
export default {
  port: process.env.PORT || 5000,
};
