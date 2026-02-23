import express from "express";
import {
  createProperty,
  deleteProperty,
  getMyProperties,
  getPropertyById,
} from "../controller/propertyController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createProperty);
router.get("/", auth, getMyProperties);
router.get("/:propertyId", auth, getPropertyById);
router.delete("/:propertyId", auth, deleteProperty);
export default router;
