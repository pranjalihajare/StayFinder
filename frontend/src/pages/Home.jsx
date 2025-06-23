import { useEffect, useState } from "react";
import api from "../api/axios";
import ListingCard from "../components/ListingCard";
import Navbar from "../components/Navbar";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await api.get("/listings");
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch listings", error);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mt-2 mb-6">Find your next stay </h1>
        {loading ? (
          <p>Loading listings...</p>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
}
