import express from "express";

import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
} from "../controllers/propertiesController.js";

const router = express.Router();

router.post("/", createProperty);

router.get("/", getProperties);

router.get("/:id", getPropertyById);
router.put("/:id", updateProperty);

export default router;
