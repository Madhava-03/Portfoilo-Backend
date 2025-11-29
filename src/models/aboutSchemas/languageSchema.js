import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Language name is required"],
      trim: true,
    },

    proficiency: {
      type: String,
      enum: ["basic", "conversational", "fluent", "native"],
      default: "basic",
    },

    certification: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: true }
);

export default languageSchema;
