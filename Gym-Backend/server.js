const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ================= Import Routes =================
const userRoutes = require("./server/routes/userRoutes");
const trainerRoutes = require("./server/routes/trainerRoutes");
const planRoutes = require("./server/routes/planRoutes");
const memberRoutes = require("./server/routes/memberRoutes");
const dashboardRoutes = require("./server/routes/dashboardRoutes");
const attendanceRoutes = require("./server/routes/attendanceRoutes");
const paymentRoutes = require("./server/routes/paymentRoutes");
const reportRoutes = require("./server/routes/reportRoutes");
const workoutRoutes = require("./server/routes/workoutRoutes");
const settingsRoutes = require("./server/routes/settingsRoutes");
const profileRoutes = require("./server/routes/profileRoutes");
const backupRoutes = require("./server/routes/backupRoutes");





const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= API Routes =================
app.use("/api/users", userRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/backup", backupRoutes);

// ================= Home Route =================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🏋️ Gym Management Backend Running Successfully",
  });
});

// ================= Invalid Route =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// ================= Error Handler =================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ================= Server Port =================
const PORT = process.env.PORT || 5000;

// ================= MongoDB Connection =================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("==================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log(`📂 Database : ${conn.connection.name}`);
    console.log(`🌐 Host     : ${conn.connection.host}`);
    console.log("==================================");

    app.listen(PORT, () => {
      console.log("==================================");
      console.log(`🚀 Server Running`);
      console.log(`🌍 http://localhost:${PORT}`);
      console.log("==================================");
    });

  } catch (err) {
    console.error("❌ MongoDB Connection Failed");
    console.error(err.message);
    process.exit(1);
  }
};

// ================= Connect Database =================
connectDB();