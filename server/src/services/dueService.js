import Due from "../models/Due_Model.js";

// Get all dues for a tenant
export const getTenantDuesService = async (tenantId) =>
  await Due.find({ tenantId }).sort({ dueDate: 1 });

// Get all dues for a landlord with tenant & property info
export const getLandlordDuesService = async (landlordId) => {
  if (!landlordId) throw new Error("Landlord ID is required");

  return await Due.find({ landlordId })
    .populate("tenantId", "firstName lastName")
    .populate({
      path: "subPropertyId",
      select: "unitName propertyId",
      populate: { path: "propertyId", select: "name" },
    })
    .select("tenantId subPropertyId amount status dueDate month year")
    .sort({ dueDate: 1 })
    .lean();
};

// Get due by ID
export const getDueByIdService = async (dueId) => await Due.findById(dueId);

// Get dues for a tenant filtered by landlord
export const getTenantDuesByIdService = async (tenantId, landlordId) => {
  if (!tenantId || !landlordId)
    throw new Error("Tenant ID and Landlord ID are required");

  return await Due.find({ tenantId, landlordId }).sort({ dueDate: 1 });
};
