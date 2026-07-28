const express = require("express");

const Member = require("../models/Member");
const Trainer = require("../models/Trainer");
const Plan = require("../models/Plan");
const Payment = require("../models/Payment");
const Attendance = require("../models/Attendance");
const Workout = require("../models/Workout");

const router = express.Router();

// ====================== REPORTS ======================
router.get("/", async (req, res) => {
  try {
    const [
      totalMembers,
      totalTrainers,
      totalPlans,
      totalPayments,
      totalAttendance,
      totalWorkouts,

      paidPayments,
      pendingPayments,

      pendingWorkouts,
      completedWorkouts,

      revenue,

      monthlyRevenue,

      recentPayments,

      recentWorkouts,
    ] = await Promise.all([

      Member.countDocuments(),
      Trainer.countDocuments(),
      Plan.countDocuments(),
      Payment.countDocuments(),
      Attendance.countDocuments(),
      Workout.countDocuments(),

      Payment.countDocuments({ status: "Paid" }),
      Payment.countDocuments({ status: "Pending" }),

      Workout.countDocuments({ status: "Pending" }),
      Workout.countDocuments({ status: "Completed" }),

      Payment.aggregate([
        {
          $match: {
            status: "Paid",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$amount",
            },
          },
        },
      ]),

      Payment.aggregate([
        {
          $match: {
            status: "Paid",
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$paymentDate" },
              month: { $month: "$paymentDate" },
            },
            amount: {
              $sum: "$amount",
            },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]),

      Payment.find()
        .sort({ paymentDate: -1 })
        .limit(5)
        .select("member amount paymentMethod paymentDate status"),

      Workout.find()
        .sort({ workoutDate: -1 })
        .limit(5)
        .select("member workoutName trainer status workoutDate"),
    ]);

    res.status(200).json({
      success: true,
      message: "Reports generated successfully",

      report: {
        totalMembers,
        totalTrainers,
        totalPlans,
        totalPayments,
        totalAttendance,
        totalWorkouts,

        paidPayments,
        pendingPayments,

        pendingWorkouts,
        completedWorkouts,

        totalRevenue:
          revenue.length > 0
            ? revenue[0].totalRevenue
            : 0,

        monthlyRevenue,

        recentPayments,

        recentWorkouts,
      },
    });

  } catch (err) {

    console.error("Report Error:", err);

    res.status(500).json({
      success: false,
      message: "Unable to generate reports",
      error: err.message,
    });

  }
});

module.exports = router;