import React, { useState } from "react";
import axios from "axios";

interface BookingComponentProps {
  selectedMeal: string;
}

const BookingComponent: React.FC<BookingComponentProps> = ({ selectedMeal }) => {
  const [mealType, setMealType] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  const handleMealTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMealType(event.target.value);
  };

  const handleMealBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        return;
      }

      const response = await axios.post(
        "https://food-management-system-backend-url.onrender.com/api/bookings",
        { mealType, meal: selectedMeal, date, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrderNumber(response.data.orderNumber);
      alert(`Meal booked successfully! Your order number is: ${response.data.orderNumber}`);
    } catch (err) {
      console.error("Error booking meal:", err);
      alert("Error booking meal");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <label className="block mb-4">
        <span className="text-gray-600">Date:</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-600">Meal Type:</span>
        <select
          value={mealType}
          onChange={handleMealTypeChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Meal Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-gray-600">Quantity:</span>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      <button
        onClick={handleMealBooking}
        disabled={!mealType || !date || quantity < 1}
        className="w-full py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-800 transition"
      >
        Book Now
      </button>

      {orderNumber !== null && (
        <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your order number is: {orderNumber}</span>
        </div>
      )}
    </div>
  );
};

export default BookingComponent;

