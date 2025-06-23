import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  location: String,
  images: [String],
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  availableDates: [Date]
}, { timestamps: true });

export default mongoose.model("Listing", listingSchema);
