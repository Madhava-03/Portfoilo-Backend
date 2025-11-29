import mongoose from "mongoose";

const hobbiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hobby name is required"],
      trim: true,
    },

    icon: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: true }
);

export default hobbiesSchema;
