import { deleteTenantHistoryService, getTenantHistoryService } from "../services/tenantHistoryService.js";

// Get tenant history
export const getTenantHistory = async (req, res) => {
  try {
    const histories = await getTenantHistoryService(req.user._id);
    res.status(200).json(histories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete tenant history
export const deleteTenantHistory = async (req, res) => {
  try {
    await deleteTenantHistoryService(req.params.id, req.user._id);
    res.status(200).json({ message: "Tenant history deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};