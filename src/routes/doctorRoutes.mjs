import express from "express";
import {
  getDoctors,
  loginDoctor,
  signupDoctor,
} from "../controllers/doctorController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const doctorRoutes = express.Router();

doctorRoutes.post("/signup", signupDoctor);

doctorRoutes.post("/login", loginDoctor);

doctorRoutes.get("/", getDoctors);

export default doctorRoutes;
