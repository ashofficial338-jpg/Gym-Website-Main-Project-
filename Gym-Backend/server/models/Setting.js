const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    gymName: {
      type: String,
      trim: true,
      default: "Gym Management System",
    },

    ownerName: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    currency: {
      type: String,
      trim: true,
      default: "INR",
    },

    timezone: {
      type: String,
      trim: true,
      default: "Asia/Kolkata",
    },

    logo: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Setting", settingSchema);