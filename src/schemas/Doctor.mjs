import mongoose from "mongoose";
import { v7 as uuidv7 } from "uuid";

const doctorSchema = new mongoose.Schema(
  {
    doctorId: {
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
      required: true,
    },

    profilePicturePath: {
      type: String,
      default: "",
    },
    specialization: {
      type: String,
      default: "",
    },
    yearsOfExperience: {
      type: Number,
      default: 0,
    },
    qualifications: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    consultationFee: {
      type: Number,
      default: 0,
    },
    avgConsultDuration: {
      type: Number,
      default: 15,
    },
    tokenCountPerDay: {
      type: Number,
      default: 0,
    },
    clinicDetails: {
      type: {
        hospitalName: {
          type: String,
          default: "",
        },
        clinicAddress: {
          type: String,
          default: "",
        },
        city: {
          type: String,
          default: "",
        },
        state: {
          type: String,
          default: "",
        },
        zipCode: {
          type: String,
          default: "",
        },
        contactNumber: {
          type: String,
          default: "",
        },
      },
      default: {},
    },
    onlineConsultation: {
      type: Boolean,
      default: false,
    },
    inPersonConsultation: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String, //approved, pending, rejected
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
