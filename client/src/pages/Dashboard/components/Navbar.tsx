import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          "https://food-management-system-backend-url.onrender.com/api/auth/user", // Update with your backend URL
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-50 p-4 flex justify-between items-center">
      {/* Left Side: Brand Name */}
      <div className="text-yellow-500 text-2xl font-bold">
        MealEase
      </div>

      {/* Right Side: User and Dropdown */}
      {!loading && user ? (
        <div className="relative">
          {/* Username (Click to toggle dropdown) */}
          <button
            onClick={toggleDropdown}
            className="font-semibold text-gray-500 hover:text-black p-2 border px-8 rounded-md"
          >
            {user.name}
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-white">Loading...</div>
      )}
    </nav>
  );
};

export default Navbar;
