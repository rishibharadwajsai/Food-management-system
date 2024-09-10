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
import "./App.css";

const App: React.FC = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const navigate = useNavigate();

  return (
    <div className=" min-h-screen home-bg flex items-center">
      {!isDashboard && (
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 h-full gap-5">
          <div className="flex flex-col justify-center w-full my-20 p-5 rounded-2xl home-content-bg">
            <h1 className="font-semibold text-4xl">Welcome to MealEase</h1>
            <p className="text-md">
              Your gateway to hassle-free meal planning!
            </p>
            <p className="text-lg my-5">
              At MealEase, we believe that good food should be easy to order and
              enjoy. Whether you’re planning your meals or reviewing past
              orders, our platform offers seamless and convenient features
              tailored just for you. No more worrying about meal prep—let us
              take care of it while you focus on enjoying your day.
            </p>
            <h1 className="font-semibold text-3xl">Why Choose MealEase?</h1>
            <p className="text-lg mb-2">Because your time matters!</p>
            <ul className="list-disc pl-5 space-y-1">
              <li className="">
                Effortlessly book meals tailored to your preferences.
              </li>
              <li>Track your order history and meal plans all in one place.</li>
              <li>
                Enjoy a user-friendly interface with quick navigation options.
              </li>
            </ul>
          </div>

          <div className="flex flex-col mx-2 justify-center items-center my-20 home-content-bg rounded-2xl min-h-96">
            <div className="mb-10">
              <button
                onClick={() => navigate("/login")}
                className="p-2 w-24 ms-2 font-bold text-lg bg-white border-t-4 border-black hover:border-green-400 hover:bg-black hover:text-white shadow-xl"
              >
                Login
              </button>{" "}
              <button
                onClick={() => navigate("/signup")}
                className="p-2 w-24 ms-2 font-bold text-lg bg-white border-t-4 border-black hover:border-green-400 hover:bg-black hover:text-white shadow-xl"
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
