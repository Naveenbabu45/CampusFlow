const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  getComplaintStats,
} = require("../controllers/complaintController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// ==========================
// Student Routes
// ==========================
router.post("/", protect, createComplaint);
router.get("/my", protect, getMyComplaints);

// ==========================
// Admin Routes
// ==========================
router.get("/stats", protect, adminOnly, getComplaintStats);
router.get("/", protect, adminOnly, getAllComplaints);
router.put("/:id", protect, adminOnly, updateComplaintStatus);

module.exports = router;