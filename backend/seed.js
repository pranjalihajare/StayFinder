import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Listing from "./models/Listing.js";
import Booking from "./models/Booking.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear old data
    await User.deleteMany();
    await Listing.deleteMany();
    await Booking.deleteMany();

    // Create sample users
    const users = await User.insertMany([
      { name: "Alice", email: "alice@example.com", password: "123456", isHost: false },
      { name: "Bob", email: "bob@example.com", password: "123456", isHost: true },
      { name: "Charlie", email: "charlie@example.com", password: "123456", isHost: true }
    ]);

    const host1 = users[1]._id;
    const host2 = users[2]._id;

    // Create sample listings
    const listings = await Listing.insertMany([
      {
        title: "Modern Apartment in City Center",
        description: "Cozy and well-located apartment perfect for short stays.",
        price: 120,
        location: "New York, NY",
        images: ["https://via.placeholder.com/600"],
        hostId: host1,
        availableDates: ["2025-07-01", "2025-07-10", "2025-07-20"]
      },
      {
        title: "Seaside Villa with Pool",
        description: "Spacious villa with ocean view and private pool.",
        price: 300,
        location: "Goa, India",
        images: ["https://via.placeholder.com/600"],
        hostId: host2,
        availableDates: ["2025-07-05", "2025-07-15", "2025-07-25"]
      }
    ]);

    console.log("✅ Seed data inserted.");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
