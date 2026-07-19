const express = require("express");
const Member = require("../models/Member");
const Trainer = require("../models/Trainer");
const Plan = require("../models/Plan");
const Payment = require("../models/Payment");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const members = await Member.countDocuments();
    const trainers = await Trainer.countDocuments();
    const plans = await Plan.countDocuments();
    const payments = await Payment.countDocuments();

    res.status(200).json({
      members,
      trainers,
      plans,
      payments,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;