import {
  createPropertyService,
  deletePropertyService,
  getLandlordPropertiesService,
  getPropertyByIdService,
} from "../services/propertyService.js";

// Create property
export const createProperty = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const property = await createPropertyService({ landlordId, ...req.body });

    res.status(201).json({ message: "Property created successfully", property });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all properties of landlord
export const getMyProperties = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const properties = await getLandlordPropertiesService(landlordId);
    res.status(200).json({ properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get property by ID
export const getPropertyById = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const { propertyId } = req.params;
    const property = await getPropertyByIdService(propertyId, landlordId);
    res.status(200).json({ property });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const { propertyId } = req.params;
    const response = await deletePropertyService(propertyId, landlordId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};