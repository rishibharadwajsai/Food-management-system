import React, { useState } from "react";
import axios from "axios";

const BookingComponent: React.FC = () => {
  const [mealType, setMealType] = useState<string>("");
  const [mealOptions, setMealOptions] = useState<string[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  const allMealOptions: { [key: string]: string[] } = {
    breakfast: ["Pancakes", "Waffles", "Omelette"],
    lunch: ["Burger", "Salad", "Pasta"],
    dinner: ["Steak", "Pizza", "Sushi"],
  };

  const handleMealTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedType = event.target.value;
    setMealType(selectedType);
    setMealOptions(allMealOptions[selectedType] || []);
    setSelectedMeal("");
  };

  const handleMealBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        return;
      }

      const response = await axios.post(
        "https://food-management-system-isyq.onrender.com/api/bookings", // Updated URL
        { mealType, meal: selectedMeal, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrderNumber(response.data.orderNumber);
      alert(
        `Meal booked successfully! Your order number is: ${response.data.orderNumber}`
      );
    } catch (err) {
      console.error("Error booking meal:", err);
      alert("Error booking meal");
    }
  };

  return (
    <div>
      <h2>Book Your Meal</h2>

      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <div>
        <label>
          Meal Type:
          <select value={mealType} onChange={handleMealTypeChange}>
            <option value="">Select Meal Type</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </label>
      </div>

      {mealType && (
        <div>
          <label>
            Select {mealType.charAt(0).toUpperCase() + mealType.slice(1)}:
            <select
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value)}
            >
              <option value="">Select</option>
              {mealOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <button onClick={handleMealBooking} disabled={!mealType || !selectedMeal}>
        Submit
      </button>

      {orderNumber !== null && (
        <div>
          <h3>Order Confirmation</h3>
          <p>Your order number is: {orderNumber}</p>
        </div>
      )}
    </div>
  );
};

export default BookingComponent;
