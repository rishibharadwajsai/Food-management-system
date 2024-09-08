import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login"; 
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard"; 

const App: React.FC = () => {
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
      </Routes>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
