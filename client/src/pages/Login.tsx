import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://food-management-system-backend-url.onrender.com/api/auth/login", // Updated URL
        formData
      );
      setMessage(res.data.msg);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.response) {
        setMessage(err.response.data.msg || "An error occurred");
      } else if (err.request) {
        setMessage("Network error: Unable to connect");
      } else {
        setMessage("Error: " + err.message);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center align-middle items-center space-y-5"
    >
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        required
        className="rounded-md text-black home-content-bg p-1"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        required
        className="rounded-md text-black home-content-bg p-1"
      />
      <button
        type="submit"
        className="
        hover:bg-blue-500 text-black border-2 border-gray-600 hover:text-white rounded-lg w-20 font-semibold p-2"
      >
        Login
      </button>
      {message && (
        <div
          className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">{message}</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default Login;
