import colletion from "../config/collection.mjs";
import connectToDatabase from "../config/db.mjs";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    await connectToDatabase();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = (req, res) => {};
