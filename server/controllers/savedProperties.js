import Property from "../models/properties.js";

export const getSavedProperties = async (req, res) => {
  try {
    const { userId } = req.user;
    const properties = await Property.find({ savedProperties: userId });
    res.status(200).json({ data: properties });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveProperty = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const property = await Property.findByIdAndUpdate(
      { _id: id },
      { $push: { savedProperties: userId } },
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property Saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unsaveProperty = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const property = await Property.findByIdAndUpdate(
      { _id: id },
      { $pull: { savedProperties: userId } },
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property Unsaved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
