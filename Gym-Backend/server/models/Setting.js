const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    gymName: {
      type: String,
      default: "Gym Management System",
    },

    ownerName: String,

    email: String,

    phone: String,

    address: String,

    currency: {
      type: String,
      default: "INR",
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    theme: {
      type: String,
      default: "light",
    },

    logo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);