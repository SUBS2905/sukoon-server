const mongoose = require("mongoose");
const profileSchema = require("./profile");

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
    verified:{
      type: Boolean,
      default: false
    },
    profile: profileSchema
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
