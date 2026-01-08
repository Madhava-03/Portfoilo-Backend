import mongoose from "mongoose";

const contentModelSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["post", "story"],
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },
    media: [
      {
        url: {
          type: String,
          required: true,
        },
        mediaType: {
          type: String,
          enum: ["image", "video"],
          required: true,
        },
      },
    ],

    expiresAt: Date,

    isHighlight: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Content", contentModelSchema);
