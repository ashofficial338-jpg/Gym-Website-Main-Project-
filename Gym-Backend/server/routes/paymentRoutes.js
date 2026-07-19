const express = require("express");
const Payment = require("../models/Payment");

const router = express.Router();

// ================= Get All Payments =================
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();

    res.status(200).json({
      payments,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= Add Payment =================
router.post("/", async (req, res) => {
  try {
    const payment = new Payment(req.body);

    await payment.save();

    res.status(201).json({
      message: "Payment Added Successfully",
      payment,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= Update Payment =================
router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      message: "Payment Updated Successfully",
      payment,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= Delete Payment =================
router.delete("/:id", async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);

    res.json({
      message: "Payment Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;