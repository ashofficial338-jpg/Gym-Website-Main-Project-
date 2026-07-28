const express = require("express");

const Member = require("../models/Member");
const Trainer = require("../models/Trainer");
const Plan = require("../models/Plan");
const Payment = require("../models/Payment");
const Attendance = require("../models/Attendance");
const Workout = require("../models/Workout");

const router = express.Router();

// ================= Dashboard Statistics =================
router.get("/", async (req, res) => {
  try {
    // Count Data
    const members = await Member.countDocuments();
    const trainers = await Trainer.countDocuments();
    const plans = await Plan.countDocuments();
    const payments = await Payment.countDocuments();
    const attendance = await Attendance.countDocuments();
    const workouts = await Workout.countDocuments();

    // Total Payment Amount
    const paymentAmount = await Payment.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Latest Members
    const recentMembers = await Member.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email");

    res.status(200).json({
      success: true,

      members,
      trainers,
      plans,
      payments,
      attendance,
      workouts,

      totalRevenue:
        paymentAmount.length > 0
          ? paymentAmount[0].total
          : 0,

      recentMembers,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;