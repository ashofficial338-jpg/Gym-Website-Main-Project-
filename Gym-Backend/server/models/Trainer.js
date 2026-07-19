const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Trainer", trainerSchema);