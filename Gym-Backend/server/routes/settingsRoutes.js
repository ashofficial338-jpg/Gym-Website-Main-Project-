const express = require("express");

const router = express.Router();


// Test Settings API
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Settings API Working"
    });
});


module.exports = router;