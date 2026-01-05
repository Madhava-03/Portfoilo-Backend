import mongoose from "mongoose";

const weeklySchema = new mongoose.Schema(
  {
    theme: {
      type: String,
      required: true,
    },
    weekNumber: {
      type: Number,
    },
    mood: {
      type: String,
      default: "Happy",
    },
    photoOfTheWeek: {
      type: String,
      default: "",
    },
    photoCaption: {
      type: String,
      maxlength: 150,
      default: "",
    },
    weeklyHighlights: {
      type: String,
      default: true,
      maxlength: 150,
    },
    peopleMentioned: {
      type: [String],
      default: [],
    },
    weeklySummary: {
      type: String,
    },
    keyInsights: {
      type: String,
      maxlength: 300,
    },
  },
  {
    id: false,
  }
);

export default weeklySchema;
