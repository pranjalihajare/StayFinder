import express from "express";
import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a booking
router.post("/", protect, async (req, res) => {
  try {
    const { listingId, dateFrom, dateTo } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    const days = (new Date(dateTo) - new Date(dateFrom)) / (1000 * 60 * 60 * 24);
    const totalPrice = days * listing.price;

    const booking = new Booking({
      userId: req.user.userId,
      listingId,
      dateFrom,
      dateTo,
      totalPrice
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
