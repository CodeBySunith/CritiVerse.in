const mongoose = require("mongoose");

const reviewReportSchema = mongoose.Schema(
  {
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "resolved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

reviewReportSchema.index(
  { reporterId: 1, reviewId: 1 },
  { unique: true }
);

const ReviewReport = mongoose.model("ReviewReport", reviewReportSchema);
module.exports = ReviewReport;