import Property from "../models/Property_Model.js";
import SubProperty from "../models/SubProperty_Model.js";

// Create a new property
export const createPropertyService = async ({
  landlordId,
  name,
  address,
  city,
  state,
  pincode,
  image,
}) => {
  if (!name || !address) {
    throw new Error("Property name and address are required");
  }

  return await Property.create({
    landlordId,
    name,
    address,
    city,
    state,
    pincode,
    image,
    totalSubProperties: 0,
  });
};

// Get all properties of a landlord
export const getLandlordPropertiesService = async (landlordId) => {
  return await Property.find({ landlordId }).sort({ createdAt: -1 });
};

// Get a specific property by ID
export const getPropertyByIdService = async (propertyId, landlordId) => {
  const property = await Property.findOne({ _id: propertyId, landlordId });
  if (!property) throw new Error("Property not found");
  return property;
};

// Delete a property after ensuring it has no subproperties
export const deletePropertyService = async (propertyId, landlordId) => {
  const property = await Property.findOne({ _id: propertyId, landlordId });
  if (!property) throw new Error("Property not found or access denied");

  const subPropertyCount = await SubProperty.countDocuments({ propertyId });
  if (subPropertyCount > 0) {
    const error = new Error("Delete all subproperties first");
    error.statusCode = 400;
    throw error;
  }

  await Property.findByIdAndDelete(propertyId);
  return { message: "Property deleted successfully" };
};
