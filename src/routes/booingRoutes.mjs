import express from "express";
import {
  createBooking,
  getBookingsByUser,
  getBookingsByDoctor,
} from "../controllers/bookingController.mjs";

const bookingRoutes = express.Router();

bookingRoutes.post("/", createBooking);

bookingRoutes.get("/user/:userId", getBookingsByUser);

bookingRoutes.get("/doctor/:doctorId", getBookingsByDoctor);

export default bookingRoutes;
