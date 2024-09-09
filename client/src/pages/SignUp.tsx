import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const { name, email, phone, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://food-management-system-isyq.onrender.com/api/auth/signup", // Updated URL
        formData
      );
      setMessage(res.data.msg);
      // console.log(res.data);
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
      className="flex flex-col justify-center align-middle items-center max-w-screen-lg mx-auto shadow-md"
    >
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Name"
        required
        className="my-2 border-2 border-black rounded-md px-2 text-black font-normal"
      />
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
        type="text"
        name="phone"
        value={phone}
        onChange={onChange}
        placeholder="Phone"
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
        className="bg-green-500 text-white mt-2 p-2 rounded-lg w-20 font-semibold"
      >
        Sign Up
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SignUp;
