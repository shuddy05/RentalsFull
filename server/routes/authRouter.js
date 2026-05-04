import express from "express";
import { Register, Login, getUser } from "../controllers/authController.js";
import { auth } from "../middleware/middleware.js";

export const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/user", auth, getUser);
