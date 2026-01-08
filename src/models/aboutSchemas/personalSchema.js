import mongoose from "mongoose";

const personalSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name is required!"],
    trim: true,
  },

  headline: {
    type: String,
    required: [true, "Headline/Role is required"],
    trim: true,
  },

  shortBio: {
    type: String,
    required: [true, "ShortBio is required"],
    maxlength: 200,
    trim: true,
  },

  longBio: {
    type: String,
    required: [true, "Detailed Bio is required"],
    trim: true,
  },

  profileImg: {
    type: String,
    required: [true, "Profile photo is required!"],
    trim: true,
  },

  coverImg: {
    type: String,
    default: "",
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is Required "],
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address",
    ],
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[0-9]{7,15}$/, "Invalid phone number"], // this is the regex expression to match the specific format of number and to validate it
    default: "",
  },

  location: {
    type: String,
    required: [true, "Location is Requried"],
  },

  resumeUrl: {
    type: String,
    default: "",
    trim: true,
  },

  socials: {
    Github: { type: String, default: "" },
    Linkedin: { type: String, default: "" },
    Instagram: { type: String, default: "" },
    Twitter: { type: String, default: "" },
    Portfolio: { type: String, default: "" },
  },
});

export default personalSchema;
