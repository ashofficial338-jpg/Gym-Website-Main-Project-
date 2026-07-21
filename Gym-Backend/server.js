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

// ================= Home Route =================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🏋️ Gym Backend Running Successfully",
  });
});

// ================= MongoDB Connection =================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Atlas Connected Successfully");
    console.log(`📂 Database: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB Connection Failed");
    console.error(err.message);
    process.exit(1);
  }
};

// ================= Server Port =================
const PORT = process.env.PORT || 5000;

// ================= Connect Database =================
connectDB();