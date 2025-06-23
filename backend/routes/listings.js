import express from "express";
import Listing from "../models/Listing.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find().populate("hostId", "name");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get listing by ID
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("hostId", "name");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create new listing (host only)
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, price, location, images, availableDates } = req.body;

    if (!req.user.isHost)
      return res.status(403).json({ message: "Only hosts can create listings" });

    const listing = new Listing({
      title,
      description,
      price,
      location,
      images,
      availableDates,
      hostId: req.user.userId
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update listing (host only)
router.put("/:id", protect, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.hostId.toString() !== req.user.userId)
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(listing, req.body);
    await listing.save();
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete listing
router.delete("/:id", protect, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.hostId.toString() !== req.user.userId)
      return res.status(403).json({ message: "Not authorized" });

    await listing.deleteOne();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
