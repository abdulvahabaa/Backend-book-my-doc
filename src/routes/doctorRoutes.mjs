import express from "express";
import {
    getDoctors,
    loginDoctor,
    registerDoctor,
} from "../controllers/doctorController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const doctorRoutes = express.Router();


doctorRoutes.post("/register", registerDoctor);

doctorRoutes.post("/login", loginDoctor)

doctorRoutes.get("/", getDoctors);


export default doctorRoutes;
