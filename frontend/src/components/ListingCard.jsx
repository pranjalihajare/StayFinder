import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <Link to={`/listings/${listing._id}`} className=" rounded-3xl shadow-xl overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
      <img src={listing.images?.[0] || "https://via.placeholder.com/600"} alt={listing.title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-gray-500">{listing.location}</p>
        <p className="text-green-600 font-medium mt-1">${listing.price}/night</p>
      </div>
    </Link>
  );
}
