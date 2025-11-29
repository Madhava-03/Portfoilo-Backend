import mongoose, { mongo } from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
    },

    fieldOfStudy: {
      type: String,
      required: [true, "field is required"],
      trim: true,
      default: "",
    },

    institution: {
      type: String,
      required: [true, "Institution is required"],
      trim: true,
    },

    Location: {
      type: String,
      trim: true,
      default: "",
    },

    startYear: {
      type: Number,
      require: [true, "Start year is required"],
      min: [2000, "Cmon bro you are born after 2000's"],
    },

    endYear: {
      type: Number,
      require: [true, "Start year is required"],
      min: [2000, "Cmon bro you are born after 2000's"],
    },

    isCurrent: {
      type: Boolean,
      default: false,
    },

    grade: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: true,
  }
);

export default educationSchema;
