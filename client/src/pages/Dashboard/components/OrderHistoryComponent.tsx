import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarDay, FaTag, FaClock } from "react-icons/fa";
import Navbar from "./Navbar";

interface Order {
  _id: string;
  mealType: string;
  meal: string;
  date: string;
  orderNumber: number;
  status: string;
}

const OrderHistoryComponent: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in first");
          return;
        }

        const response = await axios.get(
          "https://food-management-system-backend-url.onrender.com/api/bookings",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        alert("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  return (
    <>
    <Navbar />
    
    <div className="container mx-auto p-6 bg-gradient-to-b from-yellow-50 via-orange-100 to-gray-100 min-h-screen pt-20" id="orders">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Order History</h2>
      {orders.length > 0 ? (
        <div className="relative">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-full w-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 relative overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="absolute top-2 right-2 text-xs font-semibold mt-2 bg-gray-400 text-white px-4 py-2 rounded-lg">
                  {order.status}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Order #{order.orderNumber}
                </h3>
                <div className="flex items-center mb-3 text-gray-600">
                  <FaTag className="text-gray-700 mr-2" />
                  <p className="font-medium">{order.mealType}</p>
                </div>
                <div className="flex items-center mb-3 text-gray-600">
                  <FaCalendarDay className="text-gray-700 mr-2" />
                  <p>{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center mb-3 text-gray-600">
                  <FaClock className="text-gray-700 mr-2" />
                  <p>{new Date(order.date).toLocaleTimeString()}</p>
                </div>
                <p className="text-gray-700 mb-4">
                  <strong>Meal:</strong> {order.meal}
                </p>
                <div className="mt-4 text-center">
                  <button
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No orders found</p>
      )}
    </div>
    </>
  );
};

export default OrderHistoryComponent;
