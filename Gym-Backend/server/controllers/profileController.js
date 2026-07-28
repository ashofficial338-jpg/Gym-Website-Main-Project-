const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ================= GET PROFILE =================

exports.getProfile = async (req, res) => {
  try {

    const user = await User.findOne().select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      profile: user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ================= UPDATE PROFILE =================

exports.updateProfile = async (req, res) => {

  try {

    const user = await User.findOne();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;

    await user.save();

    res.json({
      success: true,
      message: "Profile Updated Successfully",
      profile: user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// ================= CHANGE PASSWORD =================

exports.changePassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findOne();

    const match = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Current Password Incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({
      success: true,
      message: "Password Changed Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};