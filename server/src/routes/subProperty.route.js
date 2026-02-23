import express from "express";
import {
  createSubProperty,
  getSubPropertiesByProperty,
  deleteSubProperty,
  getAllSubPropertiesByLandlord,
  vacateSubPropertyController,
  getSubPropertyByCurrentTenant,
} from "../controller/subPropertyContoller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createSubProperty);

router.get("/landlord", auth, getAllSubPropertiesByLandlord);

router.get("/property/:propertyId", auth, getSubPropertiesByProperty);

router.delete("/:subPropertyId", auth, deleteSubProperty);

router.put("/:subPropertyId/vacate", auth, vacateSubPropertyController);

router.get("/tenant/:tenantId", auth,getSubPropertyByCurrentTenant);

export default router;
