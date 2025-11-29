import mongoose from "mongoose";

const achievementsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Achievement title is required"],
      trim: true,
    },

    issuer: {
      type: String,
      trim: true,
      default: "",
    },

    date: {
      type: Date,
    },

    type: {
      type: String,
      enum: [
        "award",
        "certificate",
        "publication",
        "competition",
        "scholarship",
        "other",
      ],
      default: "other",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    link: {
      type: String,
      trim: true,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  { _id: true }
);

export default achievementsSchema;
