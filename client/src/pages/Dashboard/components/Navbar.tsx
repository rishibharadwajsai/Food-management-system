/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
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
          "https://food-management-system-backend-url.onrender.com/api/auth/user", 
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

  // Handle scroll to section
  const scrollToOrders = () => {
    const ordersSection = document.getElementById("orders");
    if (ordersSection) {
      ordersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (isMobile) {
        setDropdownOpen(false);
      }
    } else {
      console.warn("Orders section not found.");
    }
  };

  // Handle mobile screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="bg-gray-50 p-4 flex justify-between items-center">
      {/* Left Side: Brand Name */}
      <div className="text-yellow-500 text-2xl font-bold">
        MealEase
      </div>

      {/* Right Side: Navigation Links and User Dropdown */}
      <div className="relative flex items-center">
        {/* Desktop View - My Orders Link */}
        {!isMobile && user && (
          <>
            <button
              onClick={scrollToOrders}
              className="mr-8 font-semibold text-gray-500 hover:text-black p-2 hover:bg-gray-200 rounded-lg px-4"
            >
              My Orders
            </button>
            <button
              onClick={toggleDropdown}
              className="font-semibold text-gray-500 hover:text-black p-2 border px-8 rounded-md"
            >
              {user.name}
            </button>
          </>
        )}
        
        {/* Mobile View - User Dropdown */}
        {isMobile && user && (
          <button
            onClick={toggleDropdown}
            className="font-semibold text-gray-500 hover:text-black p-2 border px-8 rounded-md"
          >
            {user.name}
          </button>
        )}

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20`}>
            {isMobile && (
              <button
                onClick={scrollToOrders}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                My Orders
              </button>
            )}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
