import { 
  acceptExistingTenantService, 
  acceptInviteSetPasswordService, 
  getInvitationsBySubPropertyService, 
  inviteExistingTenantService, 
  inviteTenantService 
} from "../services/invitationService.js";

// Invite new tenant
export const inviteTenant = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const response = await inviteTenantService({ landlordId, ...req.body });
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Accept invite & set password
export const acceptInvite = async (req, res) => {
  try {
    const { token, password } = req.body;
    const response = await acceptInviteSetPasswordService({ token, password });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Invite existing tenant
export const inviteExistingTenantController = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const { email, subPropertyId } = req.body;
    const result = await inviteExistingTenantService({ landlordId, email, subPropertyId });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Accept existing tenant
export const acceptExistingTenantController = async (req, res) => {
  try {
    const { token } = req.body;
    const result = await acceptExistingTenantService({ token });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Get invitations by sub-property
export const getInvitationsBySubProperty = async (req, res) => {
  try {
    const { subPropertyId } = req.params;
    const landlordId = req.user._id;
    const invitation = await getInvitationsBySubPropertyService({ subPropertyId, landlordId });
    return res.status(200).json({ success: true, invitation });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};