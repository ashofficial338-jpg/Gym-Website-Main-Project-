const express = require("express");
const Member = require("../models/Member");

const router = express.Router();

// Get All Members
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();

    res.json({
      members,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Add Member
router.post("/", async (req, res) => {
  try {
    const member = new Member(req.body);

    await member.save();

    res.status(201).json({
      message: "Member Added Successfully",
      member,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Update Member
router.put("/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Member Updated Successfully",
      member,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Delete Member
router.delete("/:id", async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);

    res.json({
      message: "Member Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;