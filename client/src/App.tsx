import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login"; // Ensure correct path
import SignUp from "./pages/SignUp"; // Ensure correct path
import Dashboard from "./pages/Dashboard"; // Import Dashboard component

const App: React.FC = () => {
  // Custom hook to get the current location
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <div>
      {!isDashboard && (
        <>
          <h1>Welcome to the App</h1>
          <a href="/login">Login</a> <br />
          <a href="/signup">Sign Up</a>
          <br />
        </>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
};

// Wrap the App component with Router
const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
