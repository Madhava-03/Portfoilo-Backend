import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User requires the Name !"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "User reuires Email"],
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: function () {
      return this.provider !== "google";
    },
    minlength: 6,
    select: false, // this wont be available in the queries now or js
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  avatar: {
    type: String,
    default: "",
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,

  isActive: {
    type: Boolean,
    default: true,
  },
  loginCount: {
    type: Number,
    default: 0,
  },
  googleId: { type: String },
  provider: { type: String },
  lastLoginAt: Date,
});

//Hooks

userSchema.pre("save", function () {
  if (!this.isModified("password") || this.isNew) return;
  this.passwordChangedAt = Date.now() - 1000;
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

// Set passwordChangedAt when user updates password

//utility function for auth

userSchema.methods.correctPassword = async function (
  enteredPassword,
  storedPassword
) {
  return await bcrypt.compare(enteredPassword, storedPassword);
};

userSchema.methods.changedPasswordAfter = function (jwtTimeStamp) {
  //jwtTimeStamp is the time at which the jwt token is assigned if password is changed after that then we will wipe it out
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000);
    return jwtTimeStamp < changedTimeStamp;
  }
  return false;
};

// creating token for reseting and forgot password

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; //in 10 min

  return resetToken;
};

export default mongoose.model("User", userSchema);
