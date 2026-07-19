const express = require("express");
const router = express.Router();

const {
  addPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");

// Create Payment
router.post("/", addPayment);

// Get All Payments
router.get("/", getPayments);

// Get Payment By ID
router.get("/:id", getPaymentById);

// Update Payment
router.put("/:id", updatePayment);

// Delete Payment
router.delete("/:id", deletePayment);

module.exports = router;