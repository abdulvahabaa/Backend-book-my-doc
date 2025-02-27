import colletion from "../config/collection.mjs";
import connectToDatabase from "../config/db.mjs";
import bcrypt from "bcrypt";
import { v7 as uuidv7 } from "uuid";
import jwt from "jsonwebtoken";
import User from "../schemas/User.mjs";

export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await connectToDatabase();

    const existingUser = await colletion.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      userId: uuidv7(),
      name,
      email,
      password: hashedPassword,
    };

    await newUser.save();

    res.status(200).json({
      message: "User registered successfully",
      userId: newUser.userId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = (req, res) => {};
