const mongoose = require("mongoose");
const profileSchema = require("./profile");
const testSchema = require("./test");

const userSchema = new mongoose.Schema(
  {
    user_token: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verification_token: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    profile: profileSchema,
    selfAssessmentTests: [testSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
