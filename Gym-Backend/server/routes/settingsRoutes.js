const express = require("express");
const router = express.Router();

const Setting = require("../models/Setting");

// ======================================================
// DEFAULT SETTINGS
// ======================================================

const DEFAULT_SETTINGS = {
  gymName: "Gym Management System",
  ownerName: "",
  email: "",
  phone: "",
  address: "",
  currency: "INR",
  timezone: "Asia/Kolkata",
  logo: "",
};

// ======================================================
// TEST SETTINGS API
// GET /api/settings/test
// ======================================================

router.get("/test", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Settings API is working",
    route: "/api/settings/test",
  });
});

// ======================================================
// GET SETTINGS
// GET /api/settings
// ======================================================

router.get("/", async (req, res) => {
  try {
    let settings = await Setting.findOne();

    // Create default settings if database is empty
    if (!settings) {
      settings = await Setting.create(DEFAULT_SETTINGS);
    }

    return res.status(200).json({
      success: true,
      message: "Settings loaded successfully",
      settings,
    });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load settings",
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE SETTINGS
// PUT /api/settings
// ======================================================

router.put("/", async (req, res) => {
  try {
    const {
      gymName,
      ownerName,
      email,
      phone,
      address,
      currency,
      timezone,
      logo,
    } = req.body;

    // Find existing settings
    let settings = await Setting.findOne();

    // Create settings if database is empty
    if (!settings) {
      settings = new Setting(DEFAULT_SETTINGS);
    }

    // ==================================================
    // Update fields only when supplied
    // ==================================================

    if (gymName !== undefined) {
      settings.gymName = String(gymName).trim();
    }

    if (ownerName !== undefined) {
      settings.ownerName = String(ownerName).trim();
    }

    if (email !== undefined) {
      settings.email = String(email).trim().toLowerCase();
    }

    if (phone !== undefined) {
      settings.phone = String(phone).trim();
    }

    if (address !== undefined) {
      settings.address = String(address).trim();
    }

    if (currency !== undefined) {
      settings.currency = String(currency).trim().toUpperCase();
    }

    if (timezone !== undefined) {
      settings.timezone = String(timezone).trim();
    }

    if (logo !== undefined) {
      settings.logo = String(logo).trim();
    }

    // ==================================================
    // Validation
    // ==================================================

    if (!settings.gymName) {
      return res.status(400).json({
        success: false,
        message: "Gym name is required",
      });
    }

    if (
      settings.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // ==================================================
    // Save settings
    // ==================================================

    await settings.save();

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Settings update failed",
      error: error.message,
    });
  }
});

// ======================================================
// RESET SETTINGS
// DELETE /api/settings
// ======================================================

router.delete("/", async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(DEFAULT_SETTINGS);
    } else {
      settings.gymName = DEFAULT_SETTINGS.gymName;
      settings.ownerName = DEFAULT_SETTINGS.ownerName;
      settings.email = DEFAULT_SETTINGS.email;
      settings.phone = DEFAULT_SETTINGS.phone;
      settings.address = DEFAULT_SETTINGS.address;
      settings.currency = DEFAULT_SETTINGS.currency;
      settings.timezone = DEFAULT_SETTINGS.timezone;
      settings.logo = DEFAULT_SETTINGS.logo;

      await settings.save();
    }

    return res.status(200).json({
      success: true,
      message: "Settings reset successfully",
      settings,
    });
  } catch (error) {
    console.error("RESET SETTINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to reset settings",
      error: error.message,
    });
  }
});

// ======================================================
// INVALID SETTINGS METHOD
// ======================================================

router.use((req, res) => {
  return res.status(405).json({
    success: false,
    message: "Method not allowed for Settings API",
    path: req.originalUrl,
  });
});

// ======================================================
// EXPORT
// ======================================================

module.exports = router;