import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:5000/api/auth/login",
        formData
      );
      setMessage(res.data.msg);
      // console.log(res.data);
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
      className="my-10 p-10 flex flex-col justify-center align-middle items-center max-w-screen-lg mx-auto shadow-md"
    >
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        required
        className="my-2 border-2 border-black rounded-md px-2 text-black font-normal"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        required
        className="my-2 border-2 border-black rounded-md px-2 text-black font-normal"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white mt-2 p-2 rounded-lg w-20 font-semibold"
      >
        Login
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
