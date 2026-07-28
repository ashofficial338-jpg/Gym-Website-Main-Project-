const Member = require("../models/Member");
const Trainer = require("../models/Trainer");
const Plan = require("../models/Plan");
const Payment = require("../models/Payment");
const Attendance = require("../models/Attendance");
const Workout = require("../models/Workout");

// ====================== REPORT DASHBOARD ======================
exports.getReport = async (req, res) => {
  try {
    const [
      totalMembers,
      totalTrainers,
      totalPlans,
      totalPayments,
      totalAttendance,
      totalWorkouts,

      pendingWorkouts,
      completedWorkouts,

      paidPayments,
      pendingPayments,

      revenue,

      monthlyRevenue,

      recentPayments,

      recentWorkouts,

      memberGrowth,

      attendanceSummary,
    ] = await Promise.all([

      // Totals
      Member.countDocuments(),
      Trainer.countDocuments(),
      Plan.countDocuments(),
      Payment.countDocuments(),
      Attendance.countDocuments(),
      Workout.countDocuments(),

      // Workout Status
      Workout.countDocuments({ status: "Pending" }),
      Workout.countDocuments({ status: "Completed" }),

      // Payment Status
      Payment.countDocuments({ status: "Paid" }),
      Payment.countDocuments({ status: "Pending" }),

      // Revenue
      Payment.aggregate([
        { $match: { status: "Paid" } },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" },
          },
        },
      ]),

      // Monthly Revenue
      Payment.aggregate([
        { $match: { status: "Paid" } },
        {
          $group: {
            _id: {
              year: { $year: "$paymentDate" },
              month: { $month: "$paymentDate" },
            },
            amount: { $sum: "$amount" },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]),

      // Recent Payments
      Payment.find()
        .populate("member", "name")
        .sort({ paymentDate: -1 })
        .limit(5),

      // Recent Workouts
      Workout.find()
        .populate("member", "name")
        .populate("trainer", "name")
        .sort({ createdAt: -1 })
        .limit(5),

      // Member Growth
      Member.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
          },
        },
      ]),

      // Attendance Summary
      Attendance.aggregate([
        {
          $group: {
            _id: "$status",
            total: { $sum: 1 },
          },
        },
      ]),
    ]);

    res.status(200).json({
      success: true,
      message: "Report generated successfully",

      report: {
        totalMembers,
        totalTrainers,
        totalPlans,
        totalPayments,
        totalAttendance,
        totalWorkouts,

        pendingWorkouts,
        completedWorkouts,

        paidPayments,
        pendingPayments,

        totalRevenue:
          revenue.length > 0
            ? revenue[0].totalRevenue
            : 0,

        monthlyRevenue,

        recentPayments,

        recentWorkouts,

        memberGrowth,

        attendanceSummary,
      },
    });

  } catch (err) {

    console.error("Report Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to generate report",
      error: err.message,
    });

  }
};