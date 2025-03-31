import Booking from "../schemas/Booking.mjs";
import { v7 as uuidv7 } from "uuid";

export const createBooking = async (req, res) => {
  try {
    const {
      userId,
      doctorId,
      department,
      date,
      time,
      tokenNumber,
      fullName,
      age,
      gender,
      phoneNumber,
      relation,
    } = req.body;

    const newBooking = new Booking({
      bookingId: uuidv7(),
      user: userId,
      doctor: doctorId,
      department,
      appointmentDate: date,
      appointmentTime: time,
      tokenNumber,
      bookingFor: {
        fullName,
        age,
        gender,
        phoneNumber,
        relation,
      },
      isCompleted: false,
      status: "pending",
    });

    await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Create Booking Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch User Bookings Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBookingsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    const bookings = await Booking.find(
      { doctor: doctorId },
      { appointmentDate: date }
    );

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch Doctor Bookings Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
