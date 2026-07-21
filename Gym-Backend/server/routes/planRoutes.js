const express = require("express");
const Plan = require("../models/Plan");

const router = express.Router();

// ================= Get All Plans =================
router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find();

    res.status(200).json({
      success: true,
      plans,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ================= Add Plan =================
router.post("/", async (req, res) => {
  try {
    const { name, duration, price } = req.body;

    if (!name || !duration || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const plan = new Plan({
      name,
      duration,
      price,
    });

    await plan.save();

    res.status(201).json({
      success: true,
      message: "Plan Added Successfully",
      plan,
    });
  } catch (err) {
    console.error("Add Plan Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ================= Update Plan =================
router.put("/:id", async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plan Updated Successfully",
      plan,
    });
  } catch (err) {
    console.error("Update Plan Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ================= Delete Plan =================
router.delete("/:id", async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plan Deleted Successfully",
    });
  } catch (err) {
    console.error("Delete Plan Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;