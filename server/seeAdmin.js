const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const exists = await User.findOne({
      email: "admin@campusflow.com",
    });

    if (exists) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Admin",
      email: "admin@campusflow.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully.");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

createAdmin();
