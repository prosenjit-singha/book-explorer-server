import mongoose from "mongoose";
import config from "../config";

export const connectDB = async () => mongoose.connect(config.database_url);
