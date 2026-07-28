const Member = require("../models/Member");
const Trainer = require("../models/Trainer");
const Plan = require("../models/Plan");
const Payment = require("../models/Payment");
const Attendance = require("../models/Attendance");
const Workout = require("../models/Workout");

exports.getDashboard = async (req, res) => {
  try {
    const [
      totalMembers,
      totalTrainers,
      totalPlans,
      totalPayments,
      totalAttendance,
      totalWorkouts,
    ] = await Promise.all([
      Member.countDocuments(),
      Trainer.countDocuments(),
      Plan.countDocuments(),
      Payment.countDocuments(),
      Attendance.countDocuments(),
      Workout.countDocuments(),
    ]);

    // Total Revenue
    const revenue = await Payment.aggregate([
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
    ]);

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        totalMembers,
        totalTrainers,
        totalPlans,
        totalPayments,
        totalAttendance,
        totalWorkouts,
        totalRevenue:
          revenue.length > 0 ? revenue[0].totalRevenue : 0,
      },
    });
  } catch (err) {
    console.error("Dashboard Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: err.message,
    });
  }
};