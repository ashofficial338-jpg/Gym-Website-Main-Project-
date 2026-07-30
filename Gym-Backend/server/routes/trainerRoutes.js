const express = require("express");
const router = express.Router();

const Trainer = require("../models/Trainer");

// ======================================================
// TEST ROUTE
// GET /api/trainers/test
// ======================================================

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Trainer API is working",
  });
});

// ======================================================
// GET ALL TRAINERS
// GET /api/trainers
// ======================================================

router.get("/", async (req, res) => {
  try {
    const trainers = await Trainer.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: trainers.length,
      trainers,
    });
  } catch (error) {
    console.error("GET TRAINERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch trainers",
      error: error.message,
    });
  }
});

// ======================================================
// GET SINGLE TRAINER
// GET /api/trainers/:id
// ======================================================

router.get("/:id", async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      trainer,
    });
  } catch (error) {
    console.error("GET TRAINER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch trainer",
      error: error.message,
    });
  }
});

// ======================================================
// ADD TRAINER
// POST /api/trainers
// ======================================================

router.post("/", async (req, res) => {
  try {
    const {
      name,
      specialization,
      experience,
      phone,
      image,
      status,
    } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Trainer name is required",
      });
    }

    if (!specialization || !specialization.trim()) {
      return res.status(400).json({
        success: false,
        message: "Specialization is required",
      });
    }

    if (
      experience === undefined ||
      experience === null ||
      experience === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Experience is required",
      });
    }

    const trainer = new Trainer({
      name: name.trim(),
      specialization: specialization.trim(),
      experience: Number(experience),
      phone: phone ? String(phone).trim() : "",
      image: image ? String(image).trim() : "",
      status: status || "Active",
    });

    await trainer.save();

    res.status(201).json({
      success: true,
      message: "Trainer Added Successfully",
      trainer,
    });
  } catch (error) {
    console.error("ADD TRAINER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Trainer add failed",
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE TRAINER
// PUT /api/trainers/:id
// ======================================================

router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      specialization,
      experience,
      phone,
      image,
      status,
    } = req.body;

    const trainer = await Trainer.findById(req.params.id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    if (name !== undefined) {
      trainer.name = String(name).trim();
    }

    if (specialization !== undefined) {
      trainer.specialization = String(specialization).trim();
    }

    if (experience !== undefined && experience !== "") {
      trainer.experience = Number(experience);
    }

    if (phone !== undefined) {
      trainer.phone = String(phone).trim();
    }

    if (image !== undefined) {
      trainer.image = String(image).trim();
    }

    if (status !== undefined) {
      trainer.status = status;
    }

    await trainer.save();

    res.status(200).json({
      success: true,
      message: "Trainer Updated Successfully",
      trainer,
    });
  } catch (error) {
    console.error("UPDATE TRAINER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Trainer update failed",
      error: error.message,
    });
  }
});

// ======================================================
// DELETE TRAINER
// DELETE /api/trainers/:id
// ======================================================

router.delete("/:id", async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(
      req.params.id
    );

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trainer Deleted Successfully",
    });
  } catch (error) {
    console.error("DELETE TRAINER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Trainer delete failed",
      error: error.message,
    });
  }
});

module.exports = router;