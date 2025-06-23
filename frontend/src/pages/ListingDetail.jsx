import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await api.get(`/listings/${id}`);
        setListing(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listing", error);
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleBooking = async (e) => {
  e.preventDefault();
  if (!dates.checkIn || !dates.checkOut) {
    alert("Please select check-in and check-out dates");
    return;
  }

  // Calculate number of nights
  const start = new Date(dates.checkIn);
  const end = new Date(dates.checkOut);
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  if (nights <= 0) {
    alert("Check-out must be after check-in");
    return;
  }

  const totalPrice = listing.price * nights;

  try {
    await api.post("/bookings", {
      listingId: id,
      dateFrom: dates.checkIn,
      dateTo: dates.checkOut,
      totalPrice: totalPrice
    });
    alert("Booking successful!");
    navigate("/");
  } catch (error) {
    console.error("Booking error:", error);
    alert("Booking failed. Make sure you're logged in.");
  }
};


  if (loading) return <p className="p-4">Loading listing...</p>;
  if (!listing) return <p className="p-4">Listing not found.</p>;

  return (
    <div>
  <Navbar />
  <div className="max-w-4xl mx-auto p-4">
    <img
      src={listing.images?.[0]}
      alt={listing.title}
      className="w-200 h-64 object-cover rounded-3xl shadow-xl mb-4"
    />
    <h2 className="text-2xl font-bold">{listing.title}</h2>
    <p className="text-gray-600">{listing.location}</p>
    <p className="mt-4">{listing.description}</p>
    <p className="mt-2 text-lg text-green-600 font-semibold">
      ${listing.price}/night
    </p>

    <form
      onSubmit={handleBooking}
      className="mt-6  p-6 rounded-3xl shadow-xl bg-gray-50 space-y-4 max-w-md"
    >
      <h3 className="text-xl font-bold bg-gray-100  p-4 text-center">Book this place</h3>
      <div className="flex flex-col gap-2">
        <label>Check-in</label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          value={dates.checkIn}
          onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
        />
        <label>Check-out</label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          value={dates.checkOut}
          onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 font-bold rounded hover:opacity-90 active:opacity-70 transition"
      >
        Confirm Booking
      </button>
    </form>
  </div>
</div>

  );
}
