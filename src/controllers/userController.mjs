import bcrypt from "bcrypt";
import { v7 as uuidv7 } from "uuid";
import jwt from "jsonwebtoken";
import User from "../schemas/User.mjs";

export const signupUser = async (req, res) => {
  try {
    const { name, email, password, googleId } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let hashedPassword = null;
    let authType = "email";

    if (googleId) {
      // Google Signup
      authType = "google";
    } else {
      // Email/Password Signup
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newUser = new User({
      userId: uuidv7(),
      fullName: name,
      email,
      password: hashedPassword,
      googleId: googleId ? googleId : undefined,
      authType,
      role: "user",
    });

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

export const loginUser = async (req, res) => {
  try {
    const { email, password, googleId } = req.body;
    console.log("req.body", req.body);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (googleId) {
      // Google Login
      if (user.authType !== "google") {
        return res
          .status(400)
          .json({ message: "This email is not linked to Google." });
      }
    } else {
      // Email/Password Login
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({ token, user: userData });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
