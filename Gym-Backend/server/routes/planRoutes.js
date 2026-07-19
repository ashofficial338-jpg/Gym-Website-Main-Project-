const express = require("express");
const Plan = require("../models/Plan");

const router = express.Router();

// Get All Plans
router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find();

    res.json({
      plans,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Add Plan
router.post("/", async (req, res) => {
  try {
    const plan = new Plan(req.body);

    await plan.save();

    res.status(201).json({
      message: "Plan Added Successfully",
      plan,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Update Plan
router.put("/:id", async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Plan Updated Successfully",
      plan,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Delete Plan
router.delete("/:id", async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);

    res.json({
      message: "Plan Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;