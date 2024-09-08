import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [mealType, setMealType] = useState<string>("");
  const [mealOptions, setMealOptions] = useState<string[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [orderNumber, setOrderNumber] = useState<number | null>(null);

  const navigate = useNavigate();

  const allMealOptions: { [key: string]: string[] } = {
    breakfast: ["Pancakes", "Waffles", "Omelette"],
    lunch: ["Burger", "Salad", "Pasta"],
    dinner: ["Steak", "Pizza", "Sushi"],
  };

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
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      {user ? (
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

            <button
              onClick={handleMealBooking}
              disabled={!mealType || !selectedMeal}
            >
              Submit
            </button>

            {orderNumber !== null && (
              <div>
                <h3>Order Confirmation</h3>
                <p>Your order number is: {orderNumber}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Dashboard;
