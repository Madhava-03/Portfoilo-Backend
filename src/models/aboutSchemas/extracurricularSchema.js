import mongoose from "mongoose";

const extracurricularSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Activity title is required"],
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    isOngoing: {
      type: Boolean,
      default: false,
    },
    achievements: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { _id: true }
);

export default extracurricularSchema;
