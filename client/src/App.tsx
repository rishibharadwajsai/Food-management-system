import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; // Assuming Login.tsx is in the `pages` folder
import SignUp from "./pages/SignUp"; // Assuming SignUp.tsx is in the `pages` folder

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to the App</h1>
        <a href="/login">Login</a> <br />
        <a href="/signup">signup</a><br />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
