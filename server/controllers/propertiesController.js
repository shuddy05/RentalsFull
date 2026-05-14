import propertySchema from "../models/properties.js";


export const createProperty = async (req, res) => {
  try {
    const property = await propertySchema.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProperties = async (req, res) => {
  try {
    const properties = await propertySchema.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPropertyById = async (req, res) => {
  try {
    const property = await propertySchema.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
