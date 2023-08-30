const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    testName: {
      type: String,
      required: true,
    },
    testScore: {
      type: Number,
      required: true,
    },
    testResult: {
      type: String,
      required: true,
    },
    requireFurtherEvaluation: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = testSchema;
