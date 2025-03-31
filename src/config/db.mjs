import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGO_DB_URI;

const connectToDatabase = async () => {
  if (!MONGODB_URI) {
    console.error("❌ MongoDB URI is not defined in .env file!");
    process.exit(1);
  }

  if (mongoose.connection.readyState === 1) {
    console.log("✅ Using Cached MongoDB Connection");
    return mongoose.connection;
  }

  try {
    console.log("🚀 Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
    });

    console.log("✅ MongoDB Connected Successfully!");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
