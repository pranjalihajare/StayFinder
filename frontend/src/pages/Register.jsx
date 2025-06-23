import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", isHost: false });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <Navbar />
    <div className="max-w-sm mx-auto mt-20  bg-white rounded-3xl shadow-xl  p-8  ">
      <h2 className="text-4xl font-bold text-center text-gray-900  mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.isHost}
            onChange={(e) => setForm({ ...form, isHost: e.target.checked })}
          />
          <span>I am a Host</span>
        </label>
        <button type="submit" className="w-full bg-red-700 text-white py-2 rounded-sm text-xl font-medium hover:bg-red-500 transition"
>
          Register
        </button>
      </form>
    </div>
    </div>
  );
}
