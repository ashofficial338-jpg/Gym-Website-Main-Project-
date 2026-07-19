const express = require("express");
const Attendance = require("../models/Attendance");

const router = express.Router();

// ================= Get Attendance =================
router.get("/", async (req, res) => {
  try {
    const attendance = await Attendance.find();

    res.status(200).json({
      attendance,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= Add Attendance =================
router.post("/", async (req, res) => {
  try {
    const attendance = new Attendance({
      member: req.body.member,
      date: req.body.date,
      status: req.body.status,
    });

    await attendance.save();

    res.status(201).json({
      message: "Attendance Added Successfully",
      attendance,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= Update Attendance =================
router.put("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Attendance Updated Successfully",
      attendance,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ================= Delete Attendance =================
router.delete("/:id", async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);

    res.json({
      message: "Attendance Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;