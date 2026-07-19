const express = require("express");
const router = express.Router();

const {
  addMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
  getActiveMembers,
  getExpiredMembers,
  renewMembership,
} = require("../controllers/memberController");

// ================= Member Routes =================

// Add Member
router.post("/", addMember);

// Get All Members
router.get("/", getMembers);

// Membership Routes
router.get("/active", getActiveMembers);
router.get("/expired", getExpiredMembers);
router.put("/renew/:id", renewMembership);

// Get Single Member
router.get("/:id", getMemberById);

// Update Member
router.put("/:id", updateMember);

// Delete Member
router.delete("/:id", deleteMember);

module.exports = router;