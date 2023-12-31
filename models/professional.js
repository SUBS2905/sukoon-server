const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  license_number: {
    type: String,
    required: true,
    default: null,
  },
  licensing_authority: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  speciality: [String],
  associated_clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = professionalSchema;
