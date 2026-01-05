import mongoose from "mongoose";

const baseBlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 120,
    },
    date: {
      type: Date,
    },
    readingTime: {
      type: Number,
      default: 5,
    },
    location: {
      type: String,
      default: "Pune",
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["life", "tech", "weekly"],
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    CoverImage: {
      type: String,
      default: "",
    },

    isPublic: {
      type: Boolean,
      default: true,
    },

    isPinned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default baseBlogSchema;
