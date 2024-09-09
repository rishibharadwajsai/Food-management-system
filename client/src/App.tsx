import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const navigate = useNavigate();

  return (
    <div>
      {!isDashboard && (
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 h-[100vh] lg:h-[80vh] lg:mt-[80px] border-2 border-black p-5">
          <div className="flex flex-col justify-center order-2 md:order-1 h-full w-full">
            <h1 className="font-semibold text-3xl">Welcome to MealEase</h1>
            <p className="text-lg my-2">
              Your gateway to hassle-free meal planning!
            </p>
            <p className="text-lg">
              At MealEase, we believe that good food should be easy to order and
              enjoy. Whether you’re planning your meals or reviewing past
              orders, our platform offers seamless and convenient features
              tailored just for you. No more worrying about meal prep—let us
              take care of it while you focus on enjoying your day.
            </p>
            <h1 className="font-semibold text-2xl">Why Choose MealEase?</h1>
            <p className="text-lg my-2">Because your time matters!</p>
            <ul className="list-disc pl-5">
              <li className="mb-2">
                Effortlessly book meals tailored to your preferences.
              </li>
              <li>Track your order history and meal plans all in one place.</li>
              <li>
                Enjoy a user-friendly interface with quick navigation options.
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-center items-center md:order-2 h-full">
            <div>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white p-2 rounded-lg w-20 ms-2 font-semibold"
              >
                Login
              </button>{" "}
              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-600 text-white p-2 rounded-lg w-20 ms-2 font-semibold"
              >
                Sign Up
              </button>
            </div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        </div>
      )}

      {isDashboard && (
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      )}
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
