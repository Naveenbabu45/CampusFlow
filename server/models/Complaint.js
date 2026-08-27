const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    // ================================
    // Student who raised the complaint
    // ================================
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ================================
    // Complaint Title
    // ================================
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    // ================================
    // Complaint Category
    // ================================
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Academic",
        "Facilities",
        "Hostel",
        "Mess",
        "Transport",
        "Technical",
        "Other",
      ],
    },

    // ================================
    // Complaint Description
    // ================================
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    // ================================
    // Complaint Location
    // ================================
    location: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },

    // ================================
    // Complaint Priority
    // ================================
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    // ================================
    // Complaint Image
    // ================================
    image: {
      type: String,
      default: "",
    },

    // ================================
    // Complaint Status
    // ================================
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    // ================================
    // Admin Remarks
    // ================================
    remarks: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);