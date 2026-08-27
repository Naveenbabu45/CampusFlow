const Complaint = require("../models/Complaint");

// ================================
// Create Complaint
// ================================
const createComplaint = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      location,
      priority,
    } = req.body;

    const complaint = await Complaint.create({
      student: req.user.id,
      title,
      category,
      description,
      location,
      priority,
      image: "",
      status: "Pending",
      remarks: "",
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    console.error("Create Complaint Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================================
// Student - My Complaints
// ================================
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Get My Complaints Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================================
// Admin - Get All Complaints
// ================================
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Get All Complaints Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================================
// Admin - Update Complaint Status
// ================================
const updateComplaintStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    // Validate status
    if (
      status &&
      !["Pending", "In Progress", "Resolved"].includes(status)
    ) {
      return res.status(400).json({
        message: "Invalid complaint status",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        ...(status !== undefined && { status }),
        ...(remarks !== undefined && {
          remarks: remarks.trim(),
        }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (error) {
    console.error("Update Complaint Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================================
// Admin Dashboard Statistics
// ================================
const getComplaintStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({
      status: "Pending",
    });

    const inProgress = await Complaint.countDocuments({
      status: "In Progress",
    });

    const resolved = await Complaint.countDocuments({
      status: "Resolved",
    });

    res.status(200).json({
      total,
      pending,
      inProgress,
      resolved,
    });
  } catch (error) {
    console.error("Get Complaint Stats Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================================
// Export Controllers
// ================================
module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  getComplaintStats,
};