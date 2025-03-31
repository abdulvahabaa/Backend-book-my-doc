import mongoose from "mongoose";
import { v7 as uuidv7 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      default: uuidv7,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    }, // Password is optional for Google users
    age: {
      type: Number,
      default: 0,
      min: 0,
      max: 120,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    contactNumber: {
      type: String,
      default: "",
    },
    place: {
      type: String,
      default: "",
    },
    profilePicturePath: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    authType: {
      type: String,
      enum: ["email", "google"], // Differentiates between login methods
      required: true,
      default: "email",
    },
    googleId: {
      type: String, // Store Google ID for OAuth users
      unique: true,
      sparse: true, // Avoid duplicate key errors for non-Google users
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
