import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role is reuqires bro"],
      trim: true,
    },

    company: {
      type: String,
      required: [true, "Company is reuqires bro"],
      trim: true,
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    employmentType: {
      type: String,
      enum: [
        "full-time",
        "part-time",
        "internship",
        "freelance",
        "self-employed",
        "contract",
        "other",
      ],
      default: "full-time",
    },

    startDate: {
      type: Date,
      required: [true, "start date is reuqires bro"],
    },

    endDate: {
      type: Date,
    },

    isCurrent: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    technologies: {
      type: [String],
      default: [],
    },

    achievements: {
      type: [String],
      default: [],
    },
  },
  {
    _id: true,
  }
);

export default experienceSchema;
