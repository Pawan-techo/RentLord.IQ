import TenantHistory from "../models/TenantsHistory_Model.js";

// Get all tenant history
export const getTenantHistoryService = async (landlordId) => {
  try {
    if (!landlordId) {
      throw new Error("Landlord ID is required");
    }

    const histories = await TenantHistory.find({ landlordId })
      .populate({
        path: "propertyId",
        select: "name address",
      })
      .populate({
        path: "subPropertyId",
        select: "unitName status",
      })
      .populate({
        path: "tenantId",
        select: "firstName lastName email phone address",
      })
      .sort({ createdAt: -1 });

    return histories;
  } catch (error) {
    console.error("Error fetching tenant history:", error.message);
    throw new Error(
      "Unable to fetch tenant history. Please try again later."
    );
  }
};

// Delete tenant history
export const deleteTenantHistoryService = async (historyId, landlordId) => {
  try {
    if (!historyId || !landlordId) {
      throw new Error("History ID and Landlord ID are required");
    }

    const history = await TenantHistory.findOneAndDelete({
      _id: historyId,
      landlordId,
    });

    if (!history) {
      throw new Error("Tenant history not found or access denied");
    }

    return history;
  } catch (error) {
    console.error("Error deleting tenant history:", error.message);
    throw new Error(
      "Unable to delete tenant history. Please try again later."
    );
  }
};