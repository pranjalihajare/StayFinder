import { useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
    <Navbar />
    <div className="  flex items-center mt-[100px] justify-center">
       
      <div className="bg-white rounded-3xl shadow-xl  p-8 w-full  max-w-sm ">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Log in</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Username"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2 rounded-sm text-xl font-medium hover:bg-red-600 transition"
          >
            Log in
          </button>
        </form>
        <p className="text-center mt-4 text-lg text-black">
          or, <Link  to="/register" className="font-semibold  cursor-pointer hover:underline">sign up</Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;
