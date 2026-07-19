const express = require("express");
const Member = require("../models/Member");
const Trainer = require("../models/Trainer");
const Plan = require("../models/Plan");
const Payment = require("../models/Payment");
const Attendance = require("../models/Attendance");

const router = express.Router();

// ================= Reports =================
router.get("/", async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const totalTrainers = await Trainer.countDocuments();
    const totalPlans = await Plan.countDocuments();
    const totalPayments = await Payment.countDocuments();
    const totalAttendance = await Attendance.countDocuments();

    res.status(200).json({
      totalMembers,
      totalTrainers,
      totalPlans,
      totalPayments,
      totalAttendance,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;