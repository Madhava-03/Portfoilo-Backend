import mongoose from "mongoose";

const techSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    gitHubRepo: {
      type: String,
      default: "",
    },
    references: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      default: [],
    },
  },
  {
    id: false,
  }
);

export default techSchema;
