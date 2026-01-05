import mongoose from "mongoose";

const lifeSchema = new mongoose.Schema(
  {
    theme: {
      type: String,
      maxlength: 40,
    },
    place: {
      type: String,
      default: "Pune",
    },
    references: {
      type: [String],
      default: [],
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    id: false,
  }
);

export default lifeSchema;
