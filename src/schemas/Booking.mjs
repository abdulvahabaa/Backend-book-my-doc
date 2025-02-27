import mongoose from "mongoose";
import { v7 as uuidv7 } from "uuid";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      default: uuidv7,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // The person who made the booking
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    tokenNumber: {
      type: Number,
      default: 0,
    },
    bookingFor: {
      fullName: { type: String, required: true }, // Who the appointment is for (friend/family/self)
      age: { type: Number, required: true },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      relation: {
        type: String,
        enum: [
          "Self",
          "Son",
          "Daughter",
          "Spouse",
          "Friend",
          "Parent",
          "Other",
        ],
        required: true,
      },
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
