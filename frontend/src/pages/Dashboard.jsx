import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({ title: "", location: "", price: "", description: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await api.get("/listings/host", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setListings(data);
      } catch (err) {
        alert("Error fetching your listings.");
      }
    };
    fetchListings();
  }, [refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/listings/${editId}`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        alert("Listing updated");
      } else {
        await api.post("/listings", form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        alert("Listing created");
      }
      setForm({ title: "", location: "", price: "", description: "", image: "" });
      setEditId(null);
      setRefresh(!refresh);
    } catch (err) {
      alert("Error saving listing");
    }
  };

  const handleEdit = (listing) => {
    setEditId(listing._id);
    setForm({
      title: listing.title,
      location: listing.location,
      price: listing.price,
      description: listing.description,
      image: listing.images?.[0] || ""
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    try {
      await api.delete(`/listings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setRefresh(!refresh);
    } catch {
      alert("Failed to delete.");
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-3xl text-shadow-sm font-bold mt-6 mb-4">Your Listings</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8  bg-white rounded-3xl shadow-xl  p-8 ">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border px-3 py-2  border-gray-300 rounded "
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full border px-3 py-2 border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border px-3 py-2 border-gray-300 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border px-3 py-2 border-gray-300 rounded"
            required
          />
          <input
            type="url"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full border px-3 py-2 border-gray-300 rounded"
            required
          />
          <button className=" px-4  bg-red-700 text-white py-2 rounded-sm text-lg font-medium hover:bg-red-600 transition">
            {editId ? "Update Listing" : "Add Listing"}
          </button>
        </form>

        <div className="space-y-4">
          {listings.map((l) => (
            <div key={l._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{l.title}</h3>
                <p className="text-sm text-gray-600">{l.location}</p>
                <p>${l.price} / night</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleEdit(l)} className="px-3 py-1 bg-yellow-400 rounded text-white">Edit</button>
                <button onClick={() => handleDelete(l._id)} className="px-3 py-1 bg-red-500 rounded text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
