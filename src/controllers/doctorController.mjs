import collection from "../config/collection.mjs";
import connectToDatabase from "../config/db.mjs";
import { v7 as uuidv7 } from "uuid";
import Doctor from "../schemas/doctor.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerDoctor = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await connectToDatabase();

    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Doctor({
      doctorId: uuidv7(),
      fullName: name,
      email,
      password: hashedPassword,
      status: "pending",
    });

    await newDoctor.save();

    res.status(200).json({
      message: "Doctor registered successfully. Please update your profile",
      doctorId: newDoctor.doctorId,
    });
  } catch (error) {
    console.error("Error registering doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { doctorId: doctor.doctorId },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDoctors = async (req, res) => {
  const { status } = req.query;
  try {
    await connectToDatabase();
    const doctors = await Doctor.find({ status: status });
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error getting doctors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 