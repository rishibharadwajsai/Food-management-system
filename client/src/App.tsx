import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
          <h1 className="ms-2 my-2 font-semibold">Welcome to the App</h1>
          <button className="bg-blue-600 text-white p-2 rounded-lg w-20 ms-2 mb-10 font-semibold">
            <a href="/login">Login</a>
          </button>{" "}
          <button className="bg-blue-600 text-white p-2 rounded-lg w-20 ms-2 mb-10 font-semibold">
            <a href="/signup">Sign Up</a>
          </button>
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
