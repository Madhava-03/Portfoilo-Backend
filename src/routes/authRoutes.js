import express from "express";
import {
  signup,
  login,
  logout,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  deleteMe,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);
router.delete("/delete-me", protect, deleteMe);

router.get("/protect", protect, (req, res) => {
  res.status(200).json({
    status: "sucess",
    message: "Path is Protected",
  });
});

router.get("/restrict", protect, restrictTo("admin"), (req, res) => {
  res.json({ message: "admin here" });
});

export default router;
