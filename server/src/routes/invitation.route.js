import express from "express";
import {
  inviteTenant,
  acceptInvite,
  getInvitationsBySubProperty,
  acceptExistingTenantController,
  inviteExistingTenantController,
} from "../controller/invitationController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/invite", auth, inviteTenant);
router.post("/accept", acceptInvite);
router.post("/invite-existing", auth, inviteExistingTenantController);
router.post("/accept-existing", acceptExistingTenantController);
router.get("/subproperty/:subPropertyId", auth, getInvitationsBySubProperty);
export default router;
