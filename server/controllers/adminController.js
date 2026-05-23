import User from "../models/user.js";
import Property from "../models/properties.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });
    const forSaleProperties = await Property.countDocuments({
      status: "For Sale",
    });
    const forRentProperties = await Property.countDocuments({
      status: "For Rent",
    });

    res.status(200).json({
      totalProperties,
      totalUsers,
      forSaleProperties,
      forRentProperties,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "email")
      .sort({ createdAt: -1 });
    res.status(200).json({ properties });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get all properties", error: error.message });
  }
};

export const addProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      owner: req.user.userId,
    });
    res.status(201).json({ message: "Property added successfully", property });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add property", error: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res
      .status(200)
      .json({ message: "Property updated successfully", property });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update property", error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res
      .status(200)
      .json({ message: "Property deleted successfully", property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
