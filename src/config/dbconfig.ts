import mongoose from "mongoose";
import { env } from "./config";

const MONGODB_URL = env.MONGODB_URL;

export const databaseConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed ", err);
    throw err;
  }
};
