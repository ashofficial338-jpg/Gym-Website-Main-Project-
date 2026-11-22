// Creates (or resets) a demo login for the Gym app.
// Run from the Gym-Backend folder:  npm run seed:demo
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./server/models/User");

const DEMO_USER = {
  name: "Demo Admin",
  email: "demo@gym.com",
  password: "Demo@123",
  role: "Admin",
};

(async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash(DEMO_USER.password, 10);

    await User.findOneAndUpdate(
      { email: DEMO_USER.email },
      {
        name: DEMO_USER.name,
        email: DEMO_USER.email,
        password: hashedPassword,
        role: DEMO_USER.role,
        status: "Active",
      },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );

    console.log("Demo user ready:");
    console.log(`  Email:    ${DEMO_USER.email}`);
    console.log(`  Password: ${DEMO_USER.password}`);
  } catch (err) {
    console.error("Failed to create demo user:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
