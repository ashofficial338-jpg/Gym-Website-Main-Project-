const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ======================================================
// IMPORT ROUTES
// ======================================================

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

// ======================================================
// APP
// ======================================================

const app = express();

// ======================================================
// CONFIG
// ======================================================

const PORT = process.env.PORT || 5000;

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ======================================================
// API ROOT
// ======================================================

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🏋️ Gym Management API is working",
    version: "1.0.0",
  });
});

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/health", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    success: true,
    server: "running",
    database: dbConnected ? "connected" : "disconnected",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ======================================================
// API ROUTES
// ======================================================

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

// ======================================================
// HOME ROUTE
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🏋️ Gym Management Backend Running Successfully",
    api: "/api",
    health: "/health",
  });
});

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
    path: req.originalUrl,
    method: req.method,
  });
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:");
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ======================================================
// MONGODB CONNECTION
// ======================================================

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is missing in environment variables"
      );
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("==================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log(`📂 Database: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    console.log("==================================");

    return true;
  } catch (error) {
    console.error("==================================");
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    console.error("==================================");

    return false;
  }
};

// ======================================================
// START SERVER
// ======================================================

const startServer = async () => {
  try {
    // Start HTTP server first
    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log("==================================");
      console.log("🚀 Gym Management Backend Started");
      console.log(`🌐 Port: ${PORT}`);
      console.log(`🔗 API: http://localhost:${PORT}/api`);
      console.log(`❤️ Health: http://localhost:${PORT}/health`);
      console.log("==================================");
    });

    // Connect MongoDB
    await connectDB();

    // ==================================================
    // GRACEFUL SHUTDOWN
    // ==================================================

    const shutdown = async (signal) => {
      console.log(`\n⚠️ ${signal} received`);

      server.close(async () => {
        console.log("🛑 HTTP server closed");

        try {
          await mongoose.connection.close();
          console.log("🛑 MongoDB connection closed");
          process.exit(0);
        } catch (error) {
          console.error(
            "❌ Error closing MongoDB:",
            error.message
          );
          process.exit(1);
        }
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Server Startup Error:", error.message);
    process.exit(1);
  }
};

// ======================================================
// START APPLICATION
// ======================================================

startServer();