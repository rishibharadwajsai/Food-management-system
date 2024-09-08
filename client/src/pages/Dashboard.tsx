import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null); // State to hold user data
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect to login if no token
          return;
        }

        // Set authorization header
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data); // Set user data
      } catch (err) {
        console.error("Error fetching user data:", err);
        navigate("/login"); // Redirect to login on error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login
  };

  if (loading) {
    return <p>Loading...</p>; // Loading state
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
          <button onClick={handleLogout}>Logout</button> {/* Logout button */}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Dashboard;
