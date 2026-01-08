import mongoose from "mongoose";

const socialProfileSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      lowecase: true,
      unique: true,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 200,
      trim: true,
    },

    profileImg: {
      type: String,
      required: true,
    },
    coverImg: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

export default mongoose.model("SocialProfile", socialProfileSchema);
