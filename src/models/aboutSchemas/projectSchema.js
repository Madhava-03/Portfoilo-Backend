import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Project Description is required"],
      trim: true,
    },
    gitHubUrl: {
      type: String,
      trim: true,
      default: "",
    },
    liveUrl: {
      type: String,
      trim: true,
      default: "",
    },
    techStack: {
      type: [String],
      default: [],
    },
    role: {
      type: String,
      trim: true,
      default: "",
    },
    startDate: {
      type: Date,
      require: [true, "Start Date is required"],
    },
    endDate: {
      type: Date,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  }
);

export default projectSchema;
