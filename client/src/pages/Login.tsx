import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // State for success or error messages

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      setMessage(res.data.msg); // Set the success message
      console.log(res.data); // Handle tokens or any response here
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // Example route after successful login
    } catch (err: any) {
      if (err.response) {
        // Server error
        setMessage(err.response.data.msg || "An error occurred"); // Display error message
      } else if (err.request) {
        // Network error
        setMessage("Network error: Unable to connect");
      } else {
        // Other errors
        setMessage("Error: " + err.message);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {message && <p>{message}</p>} {/* Display message */}
    </form>
  );
};

export default Login;
