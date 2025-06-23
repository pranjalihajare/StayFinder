import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md  p-4 flex justify-between items-center">
      <div>
 <Link to="/" className="text-4xl font-bold  text-shadow-lg text-red-600">StayFinder</Link>
      </div>
     

      <div className="space-x-6">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="text-black  hover:text-gray-500  text-xl font-bold">Dashboard</Link>
            <button onClick={handleLogout} className="text-red-500  hover:text-red-700  text-xl font-bold">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-black  hover:text-gray-500  text-xl font-bold">Login</Link>
            <Link to="/register" className="text-black hover:text-gray-500 text-xl font-bold">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
