import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const url = process.env.DB_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log(`Connected to MongoDB at url`);
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// Optional: Enable mongoose debugging in development mode
if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true);
}
