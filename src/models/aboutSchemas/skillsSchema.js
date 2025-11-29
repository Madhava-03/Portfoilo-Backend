import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required bro"],
      trim: true,
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
      trim: true,
      default: "intermediate",
    },

    category: {
      type: String,
      trim: true,
      default: "",
    },

    yearsOfExperience: {
      type: Number,
      min: [0, "Years of experince must be postive bro cmon"],
      default: 0,
    },

    isPrimary: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  }
);

export default skillSchema;
