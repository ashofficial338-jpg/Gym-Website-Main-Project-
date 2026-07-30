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
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// ======================================================
// ROUTE TEST
// ======================================================

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Test Route Working Successfully",
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
    test: "/api/test",
  });
});

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
    method: req.method,
    path: req.originalUrl,
  });
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR");
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

    // Avoid unnecessary reconnect
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected");
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("==========================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log(`📂 Database : ${conn.connection.name}`);
    console.log(`🌐 Host     : ${conn.connection.host}`);
    console.log("==========================================");

  } catch (error) {
    console.error("==========================================");
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    console.error("==========================================");

    // Don't immediately crash Render.
    // Server can still respond to health/API root requests.
  }
};

// ======================================================
// MONGOOSE EVENTS
// ======================================================

mongoose.connection.on("connected", () => {
  console.log("🟢 Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("🔴 MongoDB Error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("🟡 MongoDB disconnected");
});

// ======================================================
// START SERVER
// ======================================================

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("==========================================");
  console.log("🚀 Gym Management Backend Started");
  console.log(`🌐 PORT     : ${PORT}`);
  console.log(`🔗 API      : /api`);
  console.log(`❤️ HEALTH   : /health`);
  console.log(`🧪 TEST     : /api/test`);
  console.log("==========================================");
});

// ======================================================
// DATABASE CONNECTION
// ======================================================

connectDB();

// ======================================================
// GRACEFUL SHUTDOWN
// ======================================================

const shutdown = async (signal) => {
  console.log(`\n⚠️ ${signal} received`);

  server.close(async () => {
    console.log("🛑 HTTP server closed");

    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log("🛑 MongoDB connection closed");
      }

      process.exit(0);
    } catch (error) {
      console.error(
        "❌ MongoDB shutdown error:",
        error.message
      );

      process.exit(1);
    }
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// ======================================================
// UNHANDLED ERRORS
// ======================================================

process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Promise Rejection:");
  console.error(error);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:");
  console.error(error);
});