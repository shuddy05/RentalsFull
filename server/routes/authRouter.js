import express from "express";
import { Register, Login, getUser } from "../controllers/authController.js";

export const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/user", getUser);
