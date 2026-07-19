const Member = require("../models/Member");
const Trainer = require("../models/Trainer");
const Plan = require("../models/Plan");

exports.getDashboard = async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const totalTrainers = await Trainer.countDocuments();
    const totalPlans = await Plan.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalMembers,
        totalTrainers,
        totalPlans,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};