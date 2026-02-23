import MaintenanceRequest from "../models/MaintenanceRequest_Model.js";
import Property from "../models/Property_Model.js";
import SubProperty from "../models/SubProperty_Model.js";

// Create a maintenance request
export const createMaintenanceRequestService = async ({
  tenantId,
  landlordId,
  propertyId,
  subPropertyId,
  title,
  description,
  priority = "LOW",
}) => {
  if (!title || !tenantId || !landlordId || !propertyId || !subPropertyId) {
    throw new Error("All required fields must be provided");
  }

  const property = await Property.findOne({ _id: propertyId, landlordId });
  if (!property) throw new Error("Property not found or access denied");

  const subProperty = await SubProperty.findOne({
    _id: subPropertyId,
    propertyId,
  });
  if (!subProperty) throw new Error("Sub-property not found");

  const maintenanceRequest = await MaintenanceRequest.create({
    tenantId,
    landlordId,
    propertyId,
    subPropertyId,
    title,
    description,
    priority,
  });

  return maintenanceRequest;
};

// Get maintenance requests for a tenant
export const getMaintenanceRequestsByTenantService = async (tenantId) => {
  if (!tenantId) throw new Error("Tenant ID is required");

  return MaintenanceRequest.find(
    { tenantId },
    { title: 1, priority: 1, status: 1, createdAt: 1 },
  ).sort({ createdAt: -1 });
};

// Get maintenance requests for a tenant filtered by landlord
export const getMaintenanceRequestsByTenantIdService = async (
  tenantId,
  landlordId,
) => {
  if (!tenantId || !landlordId)
    throw new Error("Tenant ID and Landlord ID are required");

  return MaintenanceRequest.find(
    { tenantId, landlordId },
    { title: 1, priority: 1, status: 1, createdAt: 1 },
  ).sort({ createdAt: -1 });
};

// Get all maintenance requests for a landlord
export const getMaintenanceRequestsByLandlordService = async (landlordId) => {
  if (!landlordId) throw new Error("Landlord ID is required");

  return MaintenanceRequest.find({ landlordId })
    .populate("tenantId", "firstName lastName email")
    .populate("propertyId", "name address")
    .populate("subPropertyId", "unitName rentAmount")
    .sort({ createdAt: -1 });
};

// Update the status of a maintenance request
export const updateMaintenanceStatusService = async (requestId, status) => {
  if (!["OPEN", "IN_PROGRESS", "RESOLVED"].includes(status)) {
    throw new Error("Invalid status");
  }

  const request = await MaintenanceRequest.findById(requestId);
  if (!request) throw new Error("Maintenance request not found");

  request.status = status;
  await request.save();
  return request;
};
