const Member = require("../models/Member");
const Trainer = require("../models/Trainer");
const Plan = require("../models/Plan");
const Payment = require("../models/Payment");
const Attendance = require("../models/Attendance");

// Dashboard Report
exports.getReport = async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const totalTrainers = await Trainer.countDocuments();
    const totalPlans = await Plan.countDocuments();
    const totalPayments = await Payment.countDocuments();
    const totalAttendance = await Attendance.countDocuments();

    const totalRevenue = await Payment.aggregate([
      {
        $match: {
          status: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      report: {
        totalMembers,
        totalTrainers,
        totalPlans,
        totalPayments,
        totalAttendance,
        totalRevenue:
          totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};