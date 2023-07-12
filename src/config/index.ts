import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

// get all env values here
const crypto = {
  iv: process.env.CRYPTO_IV as string,
  key: process.env.CRYPTO_KEY as string,
  algo: process.env.CRYPTO_ALGO as string,
};
export default {
  port: process.env.PORT || 5000,
  crypto,
};
