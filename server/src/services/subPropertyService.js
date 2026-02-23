import SubProperty from "../models/SubProperty_Model.js";
import Property from "../models/Property_Model.js";
import Due from "../models/Due_Model.js";
import TenantHistory from "../models/TenantsHistory_Model.js";

// Create a new sub-property
export const createSubPropertyService = async ({
  landlordId,
  propertyId,
  unitName,
  rentAmount,
}) => {
  if (!unitName || !rentAmount) {
    throw new Error("Unit name and rent amount are required");
  }

  const property = await Property.findOne({ _id: propertyId, landlordId });
  if (!property) throw new Error("Property not found or access denied");

  const subProperty = await SubProperty.create({
    propertyId,
    landlordId,
    unitName,
    rentAmount,
    status: "VACANT",
  });

  // Increment total sub-properties
  await Property.findByIdAndUpdate(propertyId, {
    $inc: { totalSubProperties: 1 },
  });

  return subProperty;
};

// Get all sub-properties for a property
export const getSubPropertiesByPropertyService = async (
  propertyId,
  landlordId,
) => {
  return await SubProperty.find({ propertyId, landlordId }).sort({
    createdAt: -1,
  });
};

// Get all sub-properties for a landlord with optional filters
export const getSubPropertiesByLandlordService = async ({
  landlordId,
  status,
  propertyId,
}) => {
  if (!landlordId) throw new Error("Landlord ID is required");

  const query = { landlordId };
  if (status) query.status = status;
  if (propertyId) query.propertyId = propertyId;

  return await SubProperty.find(query)
    .populate("propertyId", "name")
    .populate("currentTenantId", "firstName lastName email phone")
    .sort({ createdAt: -1 });
};

// Delete a sub-property
export const deleteSubPropertyService = async (subPropertyId, landlordId) => {
  const subProperty = await SubProperty.findOne({
    _id: subPropertyId,
    landlordId,
  });
  if (!subProperty) throw new Error("SubProperty not found or access denied");
  if (subProperty.status === "OCCUPIED")
    throw new Error("Cannot delete occupied unit");

  await SubProperty.findByIdAndDelete(subPropertyId);

  // Decrement total sub-properties
  await Property.findByIdAndUpdate(subProperty.propertyId, {
    $inc: { totalSubProperties: -1 },
  });

  return { message: "SubProperty deleted successfully" };
};

// Vacate a sub-property
export const vacateSubPropertyService = async (
  subPropertyId,
  landlordId,
  reasonForLeaving = "",
) => {
  if (!subPropertyId) throw new Error("SubProperty ID is required");

  const subProperty = await SubProperty.findOne({
    _id: subPropertyId,
    landlordId,
  });
  if (!subProperty) throw new Error("SubProperty not found or access denied");
  if (subProperty.status === "VACANT")
    throw new Error("SubProperty is already vacant");

  const tenantId = subProperty.currentTenantId;

  const latestDue = await Due.findOne({
    subPropertyId,
    tenantId,
    status: "UNPAID",
  }).sort({ createdAt: -1 });
  if (latestDue) await Due.findByIdAndDelete(latestDue._id);

  const history = await TenantHistory.findOne({
    tenantId,
    subPropertyId,
    landlordId,
    moveOutDate: null,
  });
  if (history) {
    history.moveOutDate = new Date();
    history.reasonForLeaving = reasonForLeaving || "Vacated by landlord";
    await history.save();
  }

  subProperty.status = "VACANT";
  subProperty.currentTenantId = null;
  subProperty.lease = null;
  await subProperty.save();

  return subProperty;
};

// Get sub-property by current tenant
export const getSubPropertyByCurrentTenantService = async (tenantId) => {
  if (!tenantId) throw new Error("Tenant ID is required");

  const subProperty = await SubProperty.findOne({ currentTenantId: tenantId })
    .select("lease status rentAmount unitName propertyId currentTenantId")
    .populate({
      path: "currentTenantId",
      select: "firstName lastName email phone image",
    })
    .populate({
      path: "propertyId",
      select: "name address city state pincode",
    });

  if (!subProperty) throw new Error("No subproperty found for this tenant");

  return subProperty;
};
