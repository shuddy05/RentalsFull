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
    rooms: {
      type: String,
      required: true,
    },
    bath: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Property", propertySchema);
