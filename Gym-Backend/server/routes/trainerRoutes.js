const express = require("express");
const Trainer = require("../models/Trainer");

const router = express.Router();

// GET all trainers
router.get("/", async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add trainer
router.post("/", async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();

    res.status(201).json({
      message: "Trainer Added Successfully",
      trainer,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;