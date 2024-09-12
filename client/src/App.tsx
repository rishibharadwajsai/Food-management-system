import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Home/components/Login";
import Signup from "./pages/Home/components/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home/Home";

const App: React.FC = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <Routes>
        {!isDashboard && (
          <>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} /> */}
          </>
        )}
        {isDashboard && <Route path="/dashboard/*" element={<Dashboard />} />}
      </Routes>
    </>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
