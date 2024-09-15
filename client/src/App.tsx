import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// import Login from "./pages/Home/components/Login";
// import Signup from "./pages/Home/components/Signup";
import Home from "./pages/Home/Home";
// import Dashboard from "./pages/Dashboard/Dashboard";
import DashHome from "./pages/Dashboard/DashHome";
import OrderHistoryComponent from "./pages/Dashboard/components/OrderHistoryComponent";

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
            <Route path="/signup" element={<Signup />} /> */}
          </>
        )}
        {isDashboard && (
          <>
          <Route path="/dashboard/home" element={<DashHome />}/>
          <Route path="/dashboard/orders" element={<OrderHistoryComponent />} />
          </> 
        )}
        
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
