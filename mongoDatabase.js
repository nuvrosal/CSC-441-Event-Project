const mongoose = require("mongoose");
require("dotenv").config();

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

module.exports = connectMongoDB;