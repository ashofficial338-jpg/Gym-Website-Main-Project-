const Member = require("../models/Member");

// ================= Add Member =================
exports.addMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);

    res.status(201).json({
      success: true,
      message: "Member Added Successfully",
      member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= Get All Members =================
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find()
      .populate("trainer", "name")
      .populate("plan", "name price");

    res.status(200).json({
      success: true,
      count: members.length,
      members,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= Get Member By ID =================
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)
      .populate("trainer", "name")
      .populate("plan", "name price");

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member Not Found",
      });
    }

    res.status(200).json({
      success: true,
      member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= Update Member =================
exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member Updated Successfully",
      member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= Delete Member =================
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= Get Active Members =================
exports.getActiveMembers = async (req, res) => {
  try {
    const members = await Member.find({
      membershipEndDate: { $gte: new Date() },
    })
      .populate("trainer", "name")
      .populate("plan", "name price");

    res.status(200).json({
      success: true,
      count: members.length,
      members,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= Get Expired Members =================
exports.getExpiredMembers = async (req, res) => {
  try {
    const members = await Member.find({
      membershipEndDate: { $lt: new Date() },
    })
      .populate("trainer", "name")
      .populate("plan", "name price");

    res.status(200).json({
      success: true,
      count: members.length,
      members,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= Renew Membership =================
exports.renewMembership = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member Not Found",
      });
    }

    member.membershipEndDate = req.body.membershipEndDate;
    member.status = "Active";

    await member.save();

    res.status(200).json({
      success: true,
      message: "Membership Renewed Successfully",
      member,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};