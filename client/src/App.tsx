import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // Ensure correct path
import SignUp from "./pages/SignUp"; // Ensure correct path
import Dashboard from "./pages/Dashboard"; // Import Dashboard component

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to the App</h1>
        {/* Remove or comment out the login and signup links */}
        <a href="/login">Login</a> <br />
        <a href="/signup">Sign Up</a>
        <br />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          {/* Ensure this route is present */}
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
