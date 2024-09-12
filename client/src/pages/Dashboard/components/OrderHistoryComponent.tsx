import React, { useEffect, useState } from "react";
import axios from "axios";

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
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="bg-white p-4 rounded-lg shadow-lg">
              <p>
                <strong>Order Number:</strong> {order.orderNumber}
              </p>
              <p>
                <strong>Meal Type:</strong> {order.mealType}
              </p>
              <p>
                <strong>Meal:</strong> {order.meal}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default OrderHistoryComponent;
