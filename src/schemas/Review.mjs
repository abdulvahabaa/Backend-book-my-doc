import mongoose from "mongoose";
import { v7 as uuidv7 } from "uuid";

const reviewSchema = new mongoose.Schema(
  {
    reviewId: {
      type: String,
      unique: true,
      default: uuidv7,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
    reviewFor: {
      fullName: { type: String, required: true }, // Who was the patient
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
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
