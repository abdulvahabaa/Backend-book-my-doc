import express from "express";

const adminRoutes = express.Router();

adminRoutes.get("/", (req, res) => {
    res.status(200).json({ message: "Admin route" });
}); 

export default adminRoutes;