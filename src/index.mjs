import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
// import morgan from "morgan";
import dotenv from "dotenv";
import multer from "multer";


import userRoutes from "./routes/userRoutes.mjs";
import doctorRoutes from "./routes/doctorRoutes.mjs";
import connectToDatabase from "./config/db.mjs";
// import adminRoutes from "./routes/adminRoutes.mjs";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("combined"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limited: "30mb", extended: true }));


app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
// app.use("/api/admins", adminRoutes);

app.listen(PORT, () => {
    console.log(
      `Process ID ${process.pid}: Server running on PORT ${PORT} in Dev Mode`
    );
  });


