import {
  getTenantDuesService,
  getLandlordDuesService,
  getDueByIdService,
  getTenantDuesByIdService,
} from "../services/dueService.js";

// Tenant → all dues
export const getTenantDues = async (req, res) => {
  try {
    const tenantId = req.user._id;
    const dues = await getTenantDuesService(tenantId);
    res.status(200).json({ success: true, data: dues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Landlord → all dues
export const getLandlordDues = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const dues = await getLandlordDuesService(landlordId);
    res.status(200).json({ success: true, data: dues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single due by id
export const getDueById = async (req, res) => {
  try {
    const { dueId } = req.params;
    const due = await getDueByIdService(dueId);

    if (!due)
      return res.status(404).json({ success: false, message: "Due not found" });

    res.status(200).json({ success: true, data: due });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Tenant dues filtered by id
export const getTenantDuesByIdController = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const landlordId = req.user._id;

    const dues = await getTenantDuesByIdService(tenantId, landlordId);

    res.status(200).json({ success: true, dues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};