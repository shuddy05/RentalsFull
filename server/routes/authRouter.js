import express from "express";
import {
  Register,
  Login,
  getUser,
  Logout,
  deleteAccount,
  updatePassword,
} from "../controllers/authController.js";
import { auth } from "../middleware/middleware.js";
import {
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../controllers/passwordController.js";

export const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/user", auth, getUser);
router.get("/logout", auth, Logout);
router.delete("/delete-account", auth, deleteAccount);
router.post("/update-password", auth, updatePassword);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
