import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["For Sale", "For Rent"],
      required: true,
    },
    type: {
      type: String,
      enum: ["Apartment", "House", "Villa", "Office Space"],
      required: true,
    },
    rooms: {
      type: String,
      required: true,
    },
    bath: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    squareArea: {
      type: String,
      required: true,
    },
    parking: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    savedProperties: {
      type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
      default: [],
    },

    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Property", propertySchema);
