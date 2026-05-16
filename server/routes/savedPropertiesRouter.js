import express from "express";
import {
  getSavedProperties,
  saveProperty,
  unsaveProperty,
} from "../controllers/savedProperties.js";
import { auth } from "../middleware/middleware.js";

const router = express.Router();

router.get("/", auth, getSavedProperties);
router.post("/save/:id", auth, saveProperty);
router.post("/unsave/:id", auth, unsaveProperty);

export default router;
