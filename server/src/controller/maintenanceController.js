import {
  createMaintenanceRequestService,
  getMaintenanceRequestsByLandlordService,
  getMaintenanceRequestsByTenantIdService,
  getMaintenanceRequestsByTenantService,
  updateMaintenanceStatusService,
} from "../services/maintenanceService.js";

// Create request
export const createMaintenanceRequestController = async (req, res) => {
  try {
    const maintenance = await createMaintenanceRequestService(req.body);
    res.status(201).json({ success: true, data: maintenance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get tenant requests
export const getMaintenanceRequestsByTenant = async (req, res) => {
  try {
    const tenantId = req.user._id;
    const requests = await getMaintenanceRequestsByTenantService(tenantId);
    res.status(200).json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get requests for a specific tenant by landlord
export const getMaintenanceRequestsByTenantId = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const { tenantId } = req.params;
    const requests = await getMaintenanceRequestsByTenantIdService(tenantId, landlordId);
    res.status(200).json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all requests for landlord
export const getMaintenanceRequestsByLandlordController = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const requests = await getMaintenanceRequestsByLandlordService(landlordId);
    res.status(200).json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update request status
export const updateMaintenanceStatusController = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const updatedRequest = await updateMaintenanceStatusService(requestId, status);
    res.status(200).json({ success: true, data: updatedRequest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};