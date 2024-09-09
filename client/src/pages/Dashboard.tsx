import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingComponent from "./BookingComponent";
import OrderHistoryComponent from "./OrderHistoryComponent";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentComponent, setCurrentComponent] = useState<
    "none" | "booking" | "order-history"
  >("none");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBookingClick = () => {
    setCurrentComponent("booking");
  };

  const handleOrderHistoryClick = () => {
    setCurrentComponent("order-history");
  };

  const handleBackToDashboard = () => {
    setCurrentComponent("none");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      {user && (
        <div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <button onClick={handleLogout}>Logout</button>

          <div>
            <button
              onClick={handleBookingClick}
              className="bg-blue-600 text-white p-2 rounded-lg w-40 ms-2 mb-10 font-semibold"
            >
              Book a Meal
            </button>
            <button
              onClick={handleOrderHistoryClick}
              className="bg-blue-600 text-white p-2 rounded-lg w-40 ms-2 mb-10 font-semibold"
            >
              View Order History
            </button>
          </div>

          <div className="component-container">
            {currentComponent === "booking" && <BookingComponent />}
            {currentComponent === "order-history" && <OrderHistoryComponent />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
