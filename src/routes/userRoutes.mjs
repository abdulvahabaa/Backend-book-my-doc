import express from "express";
import { registerUser, loginUser } from "../controllers/userController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, (req, res) => {
    res.status(200).json({ message: "Logout successful" });
});

export default router;