import {
  getAllUsers,
  getMyLandlordService,
  getMyTenantsService,
  getUserProfileByToken,
  updateProfileImageService,
  updateSubscriptionService,
} from "../services/userServices.js";

// Get user profile from token
export const getUserProfile = async (req, res) => {
  try {
    const jwt = req.headers.authorization?.split(" ")[1];
    if (!jwt) return res.status(404).send({ error: "Token not found" });

    const user = await getUserProfileByToken(jwt);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Get tenants of a landlord
export const getMyTenants = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const tenants = await getMyTenantsService(landlordId);

    return res.status(200).json({
      count: tenants.length,
      tenants,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get landlord info for a tenant
export const getMyLandlord = async (req, res) => {
  try {
    const tenantId = req.user._id;
    const landlordInfo = await getMyLandlordService(tenantId);

    return res.status(200).json(landlordInfo);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// Update subscription
export const updateSubscriptionController = async (req, res) => {
  try {
    const updatedUser = await updateSubscriptionService(req.user._id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("SUBSCRIPTION ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update profile image
export const updateProfileImageController = async (req, res) => {
  try {
    const updatedUser = await updateProfileImageService(req.user._id, req.body.image);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};