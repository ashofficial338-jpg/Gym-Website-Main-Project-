const express = require("express");
const Plan = require("../models/Plan");

const router = express.Router();

// Get all plans
router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new plan
router.post("/", async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();

    res.status(201).json({
      message: "Plan Added Successfully",
      plan,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;