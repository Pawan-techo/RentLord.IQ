import {
  createSubPropertyService,
  getSubPropertiesByPropertyService,
  deleteSubPropertyService,
  getSubPropertiesByLandlordService,
  vacateSubPropertyService,
  getSubPropertyByCurrentTenantService,
} from "../services/subPropertyService.js";

// Create sub-property
export const createSubProperty = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const subProperty = await createSubPropertyService({ landlordId, ...req.body });
    res.status(201).json({ message: "SubProperty created successfully", subProperty });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get sub-properties by property
export const getSubPropertiesByProperty = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const { propertyId } = req.params;
    const subProperties = await getSubPropertiesByPropertyService(propertyId, landlordId);
    res.status(200).json({ subProperties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sub-properties of landlord
export const getAllSubPropertiesByLandlord = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const { status, propertyId } = req.query;
    const units = await getSubPropertiesByLandlordService({ landlordId, status, propertyId });
    res.status(200).json({ success: true, count: units.length, data: units });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete sub-property
export const deleteSubProperty = async (req, res) => {
  try {
    const landlordId = req.user._id;
    const { subPropertyId } = req.params;
    const response = await deleteSubPropertyService(subPropertyId, landlordId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get sub-property by current tenant
export const getSubPropertyByCurrentTenant = async (req, res) => {
  try {
    const { tenantId } = req.params;
    const subProperty = await getSubPropertyByCurrentTenantService(tenantId);
    res.status(200).json(subProperty);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Vacate sub-property
export const vacateSubPropertyController = async (req, res) => {
  try {
    const { subPropertyId } = req.params;
    const { reasonForLeaving } = req.body;
    const landlordId = req.user._id;

    const updatedSubProperty = await vacateSubPropertyService(subPropertyId, landlordId, reasonForLeaving);
    res.status(200).json({ success: true, message: "Tenant vacated successfully", data: updatedSubProperty });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};