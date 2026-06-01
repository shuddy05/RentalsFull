import express from "express";

import {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  addProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
} from "../controllers/adminController.js";
import { auth } from "../middleware/middleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/dashboard-stats", auth, isAdmin, getDashboardStats);
router.get("/users", auth, isAdmin, getAllUsers);
router.delete("/users/:id", auth, isAdmin, deleteUser);
router.get("/properties", auth, isAdmin, getAllProperties);
router.post("/properties", auth, isAdmin, addProperty);
router.patch("/properties/:id", auth, isAdmin, updateProperty);
router.delete("/properties/:id", auth, isAdmin, deleteProperty);

export default router;
