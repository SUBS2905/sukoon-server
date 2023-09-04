const mongoose = require("mongoose");
const profileSchema = require("./profile");
const testSchema = require("./test");
const professionalSchema = require("./professional");

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
    reset_token: {
      type: String,
    },
    reset_token_expiry: {
      type: Date,
    },
    verification_token: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isProfessional: {
      type: Boolean,
      default: false,
    },
    professional: {
      type: professionalSchema,
    },
    profile: {
      type: profileSchema,
    },
    selfAssessmentTests: {
      type: [testSchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
